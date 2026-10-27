"""Local preview server that mimics Vercel's cleanUrls.

/packages serves packages.html and /requested serves thank-you.html, the way
vercel.json does on the live site, and unknown addresses get 404.html with a
404 status, as on Vercel. Run from the site folder:
    python .claude/dev-server.py 8080
"""
import os
import sys
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer

PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 8080
REWRITES = {"/requested": "/thank-you.html"}


class CleanUrlHandler(SimpleHTTPRequestHandler):
    def translate_path(self, path):
        route = path.split("?", 1)[0].split("#", 1)[0]
        route = REWRITES.get(route, route)
        if route != "/" and not os.path.splitext(route)[1] and os.path.isfile(route.lstrip("/") + ".html"):
            route += ".html"
        return super().translate_path(route)

    def send_error(self, code, message=None, explain=None):
        if code == 404 and os.path.isfile("404.html"):
            body = open("404.html", "rb").read()
            self.send_response(404)
            self.send_header("Content-Type", "text/html; charset=utf-8")
            self.send_header("Content-Length", str(len(body)))
            self.end_headers()
            self.wfile.write(body)
            return
        super().send_error(code, message, explain)


ThreadingHTTPServer(("127.0.0.1", PORT), CleanUrlHandler).serve_forever()
