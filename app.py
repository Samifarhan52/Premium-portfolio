from flask import Flask, render_template, Response, url_for
import os
from datetime import date

app = Flask(__name__)

PROJECTS = {
    "bike-rentals": {
        "title": "Bike Rentals",
        "subtitle": "BCA Final Year Project (2024)",
        "summary": "A web-based bike rental platform with a structured browsing and booking-style flow designed for a smooth user experience.",
        "tags": ["Python", "Flask", "UI/UX", "Web App"],
        "features": [
            "Structured bike discovery flow",
            "Clean booking-style journey",
            "Responsive web interface",
            "User-focused navigation"
        ]
    },
    "pet-shop-website": {
        "title": "Pet Shop Website",
        "subtitle": "Freelance Project (2025)",
        "summary": "A friendly business website concept for a pet-focused service/store with product visibility, service communication, and trust-building design.",
        "tags": ["Freelance", "Business Site", "Frontend", "UI/UX"],
        "features": [
            "Customer-friendly layout",
            "Service and product visibility",
            "Brand-focused visual presentation",
            "Modern responsive design"
        ]
    },
    "old-portfolio": {
        "title": "Old Portfolio",
        "subtitle": "Personal Portfolio Archive",
        "summary": "An earlier portfolio iteration that shaped the visual direction, structure, and presentation style of my current personal brand.",
        "tags": ["Portfolio", "Branding", "Frontend"],
        "features": [
            "Personal brand foundation",
            "Early visual experimentation",
            "Developer presentation structure",
            "Career showcase evolution"
        ]
    },
    "agri-link-hub": {
        "title": "Agri Link Hub",
        "subtitle": "Concept / Platform Project",
        "summary": "A concept platform intended to bring agriculture-related information, access points, and digital workflows into a more organized experience.",
        "tags": ["Concept", "Platform", "Research"],
        "features": [
            "Agriculture-focused information flow",
            "Platform thinking",
            "Domain-centered navigation",
            "Structured user pathways"
        ]
    },
    "welift-project": {
        "title": "Welift Project",
        "subtitle": "Web Product / Platform Concept",
        "summary": "A mobility-oriented product concept focused on smooth access, structured interaction, and modern product thinking for transportation use cases.",
        "tags": ["Mobility", "Web Product", "UX"],
        "features": [
            "Mobility use-case design",
            "Modern product framing",
            "User-flow-driven structure",
            "Clean web presentation"
        ]
    },
    "sapna-home-needs": {
        "title": "Sapna Home Needs",
        "subtitle": "Business Website Concept",
        "summary": "A professional local business website concept designed to improve online presence, communication clarity, and customer trust.",
        "tags": ["Business Website", "Local Brand", "Web Design"],
        "features": [
            "Professional business presentation",
            "Clean service communication",
            "Trust-focused visual language",
            "Responsive customer-first layout"
        ]
    },
}

SITE_URL = os.getenv("SITE_URL", "https://premium-portfolio.vercel.app")
GA_MEASUREMENT_ID = os.getenv("GA_MEASUREMENT_ID", "G-XXXXXXXXXX")
FORMSPREE_ENDPOINT = os.getenv("FORMSPREE_ENDPOINT", "https://formspree.io/f/yourFormId")

@app.context_processor
def inject_globals():
    return {
        "SITE_URL": SITE_URL.rstrip("/"),
        "GA_MEASUREMENT_ID": GA_MEASUREMENT_ID,
        "FORMSPREE_ENDPOINT": FORMSPREE_ENDPOINT,
        "CURRENT_YEAR": date.today().year,
    }

@app.route("/")
def home():
    return render_template("index.html", projects=PROJECTS)

@app.route("/project/<slug>")
def project_detail(slug):
    project = PROJECTS.get(slug)
    if not project:
        return render_template("404.html"), 404
    return render_template("project_detail.html", project=project, slug=slug)

@app.route("/robots.txt")
def robots():
    content = f"""User-agent: *
Allow: /

Sitemap: {SITE_URL.rstrip('/')}/sitemap.xml
"""
    return Response(content, mimetype="text/plain")

@app.route("/sitemap.xml")
def sitemap():
    pages = [
        ("home", {}),
    ]
    project_pages = [("project_detail", {"slug": slug}) for slug in PROJECTS.keys()]

    urls = []
    for endpoint, values in pages + project_pages:
        url = SITE_URL.rstrip("/") + url_for(endpoint, **values)
        urls.append(url)

    xml = ['<?xml version="1.0" encoding="UTF-8"?>']
    xml.append('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">')
    for url in urls:
        xml.append("  <url>")
        xml.append(f"    <loc>{url}</loc>")
        xml.append("  </url>")
    xml.append("</urlset>")

    return Response("\n".join(xml), mimetype="application/xml")

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)