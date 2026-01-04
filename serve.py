#!/usr/bin/env python3
"""
Serveur de développement simple pour le générateur de factures
"""

import http.server
import socketserver
import webbrowser
import os
import sys

PORT = 8000

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=os.getcwd(), **kwargs)

def main():
    try:
        with socketserver.TCPServer(("", PORT), Handler) as httpd:
            print(f"Serveur démarré sur http://localhost:{PORT}")
            print(f"Tests disponibles sur http://localhost:{PORT}/tests/test-runner.html")
            print("Appuyez sur Ctrl+C pour arrêter")
            
            # Ouvrir automatiquement le navigateur
            webbrowser.open(f'http://localhost:{PORT}')
            
            httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nServeur arrêté")
        sys.exit(0)
    except OSError as e:
        if e.errno == 10048:  # Port déjà utilisé sur Windows
            print(f"Le port {PORT} est déjà utilisé. Essayez un autre port.")
        else:
            print(f"Erreur : {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()