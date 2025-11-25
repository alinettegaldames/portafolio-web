const http = require('http')
const fs = require('fs')
const path = require('path')

const PORT = process.env.PORT || 3000
const root = path.resolve(__dirname)

const mime = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.pdf': 'application/pdf',
  '.json': 'application/json'
}

http.createServer((req, res) => {
  try {
    const safePath = req.url.split('?')[0].replace(/\/+/, '/').replace(/\.\./g, '')
    let filePath = path.join(root, safePath)
    if (safePath === '/' || safePath === '') filePath = path.join(root, 'index.html')
    if (!fs.existsSync(filePath)) {
      res.statusCode = 404
      res.end('Not found')
      return
    }
    const stat = fs.statSync(filePath)
    if (stat.isDirectory()) {
      const index = path.join(filePath, 'index.html')
      if (fs.existsSync(index)) filePath = index
      else { res.statusCode = 404; res.end('Not found'); return }
    }
    const ext = path.extname(filePath).toLowerCase()
    res.setHeader('Content-Type', mime[ext] || 'application/octet-stream')
    if (ext === '.pdf') {
      res.setHeader('Content-Disposition', 'attachment; filename="' + path.basename(filePath) + '"')
    }
    const stream = fs.createReadStream(filePath)
    stream.pipe(res)
  } catch (err) {
    res.statusCode = 500
    res.end('Server error')
  }
}).listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`))
