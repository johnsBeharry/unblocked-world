import multer from 'multer'
import { ExternalSubmissionApiError, submitSubmission } from '../server/lib/externalSubmissionApi.js'

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 20 * 1024 * 1024, files: 4, fields: 20, fieldSize: 4000 },
}).fields([
  { name: 'file', maxCount: 1 },
  { name: 'assets', maxCount: 3 },
])

function parseMultipart(req, res) {
  return new Promise((resolve, reject) => {
    upload(req, res, error => (error ? reject(error) : resolve()))
  })
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'method_not_allowed' })
  }

  try {
    await parseMultipart(req, res)
    const posterFile = req.files?.file?.[0]
    const assets = (req.files?.assets || []).map(file => ({
      buffer: file.buffer,
      filename: file.originalname,
      contentType: file.mimetype,
    }))
    const result = await submitSubmission({
      title: req.body.title,
      file: posterFile && {
        buffer: posterFile.buffer,
        filename: posterFile.originalname,
        contentType: posterFile.mimetype,
      },
      image_url: req.body.image_url,
      artist_name: req.body.artist_name,
      artist_email: req.body.artist_email,
      country: req.body.country,
      concept: req.body.concept,
      year_designed: req.body.year_designed,
      designed_for: req.body.designed_for,
      client_name: req.body.client_name,
      creation_method: req.body.creation_method,
      materials_used: req.body.materials_used,
      digital_programs: req.body.digital_programs,
      printing_method: req.body.printing_method,
      age: req.body.age,
      assets,
    })
    return res.status(201).json(result)
  } catch (error) {
    const status = error instanceof ExternalSubmissionApiError
      ? (error.status && error.status < 500 ? error.status : 502)
      : error instanceof TypeError || error instanceof multer.MulterError ? 400 : 500
    return res.status(status).json({ error: error.body?.error || error.message || 'submission_failed' })
  }
}
