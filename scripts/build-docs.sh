#!/bin/bash
# Fort Homes QMS - Documentation Build Script
# Converts markdown documents to HTML and PDF formats

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Directories
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
DOCS_DIR="$PROJECT_ROOT/docs"
DIST_DIR="$PROJECT_ROOT/dist"
HTML_DIR="$DIST_DIR/html"
PDF_DIR="$DIST_DIR/pdf"
ASSETS_DIR="$PROJECT_ROOT/assets"
PANDOC_DIR="$PROJECT_ROOT/pandoc"
TEMPLATES_DIR="$PROJECT_ROOT/templates"

# Create output directories
mkdir -p "$HTML_DIR" "$PDF_DIR"

echo -e "${GREEN}Fort Homes QMS Documentation Builder${NC}"
echo "========================================"
echo ""

# Function to build HTML from markdown
build_html() {
    local input_file="$1"
    local output_file="$2"
    local relative_path="$3"
    
    echo -e "${YELLOW}Building HTML:${NC} $(basename "$output_file")"
    
    pandoc "$input_file" \
        --from markdown+yaml_metadata_block \
        --to html5 \
        --standalone \
        --toc \
        --toc-depth=3 \
        --number-sections \
        --css="$relative_path/assets/css/main.css" \
        --css="$relative_path/assets/css/typography.css" \
        --css="$relative_path/assets/css/tables.css" \
        --css="$relative_path/assets/css/forms.css" \
        --css="$relative_path/assets/css/diagrams.css" \
        --metadata title="Fort Homes QMS Documentation" \
        --output "$output_file"
}

# Function to build PDF from markdown (simplified)
build_pdf() {
    local input_file="$1"
    local output_file="$2"
    
    echo -e "${YELLOW}Building PDF:${NC} $(basename "$output_file")"
    
    pandoc "$input_file" \
        --from markdown+yaml_metadata_block \
        --to pdf \
        --pdf-engine=pdflatex \
        --toc \
        --toc-depth=3 \
        --number-sections \
        --variable geometry:margin=1in \
        --variable geometry:left=0.75in \
        --variable geometry:right=0.75in \
        --variable fontsize=11pt \
        --variable papersize=letter \
        --metadata title="Fort Homes QMS Documentation" \
        --output "$output_file" 2>/dev/null || {
            echo -e "${RED}PDF generation failed for $(basename "$output_file")${NC}"
            return 1
        }
}

# Build HTML documents
echo -e "\n${GREEN}Building HTML Documents...${NC}"
echo "-----------------------------------"

# Copy assets to dist for HTML
echo "Copying assets..."
cp -r "$ASSETS_DIR" "$DIST_DIR/"

# Build SOPs
if [ -d "$DOCS_DIR/sops" ]; then
    echo -e "\n${YELLOW}Processing SOPs...${NC}"
    mkdir -p "$HTML_DIR/sops"
    for md_file in "$DOCS_DIR/sops"/*.md; do
        if [ -f "$md_file" ]; then
            filename=$(basename "$md_file" .md)
            build_html "$md_file" "$HTML_DIR/sops/${filename}.html" "../.."
        fi
    done
fi

# Build Work Instructions
if [ -d "$DOCS_DIR/work-instructions" ]; then
    echo -e "\n${YELLOW}Processing Work Instructions...${NC}"
    mkdir -p "$HTML_DIR/work-instructions"
    for md_file in "$DOCS_DIR/work-instructions"/*.md; do
        if [ -f "$md_file" ]; then
            filename=$(basename "$md_file" .md)
            build_html "$md_file" "$HTML_DIR/work-instructions/${filename}.html" "../.."
        fi
    done
fi

# Build Forms/Templates
if [ -d "$DOCS_DIR/forms-templates" ]; then
    echo -e "\n${YELLOW}Processing Forms & Templates...${NC}"
    mkdir -p "$HTML_DIR/forms-templates"
    for md_file in "$DOCS_DIR/forms-templates"/*.md; do
        if [ -f "$md_file" ]; then
            filename=$(basename "$md_file" .md)
            build_html "$md_file" "$HTML_DIR/forms-templates/${filename}.html" "../.."
        fi
    done
fi

# Build Manual sections
if [ -d "$DOCS_DIR/manual" ]; then
    echo -e "\n${YELLOW}Processing Manual sections...${NC}"
    mkdir -p "$HTML_DIR/manual"
    for md_file in "$DOCS_DIR/manual"/*.md; do
        if [ -f "$md_file" ]; then
            filename=$(basename "$md_file" .md)
            build_html "$md_file" "$HTML_DIR/manual/${filename}.html" "../.."
        fi
    done
fi

# Create index.html
echo -e "\n${YELLOW}Creating index...${NC}"
cat > "$HTML_DIR/index.html" << 'EOF'
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Fort Homes QMS Documentation</title>
    <link rel="stylesheet" href="../assets/css/main.css">
    <link rel="stylesheet" href="../assets/css/typography.css">
</head>
<body>
    <header class="document-header">
        <div class="document-header-left">🏗️ FORT HOMES</div>
        <div class="document-header-center">QUALITY MANAGEMENT SYSTEM</div>
        <div class="document-header-right">FHDEV-QMS</div>
    </header>
    
    <div class="document-wrapper">
        <h1 class="document-title">Fort Homes QMS Documentation</h1>
        
        <div class="document-control">
            <h2>Documentation Index</h2>
            <p>Welcome to the Fort Homes Quality Management System documentation.</p>
        </div>
        
        <section>
            <h2>Standard Operating Procedures (SOPs)</h2>
            <ul id="sop-list"></ul>
        </section>
        
        <section>
            <h2>Work Instructions</h2>
            <ul id="wi-list"></ul>
        </section>
        
        <section>
            <h2>Forms & Templates</h2>
            <ul id="forms-list"></ul>
        </section>
        
        <section>
            <h2>Manual</h2>
            <ul id="manual-list"></ul>
        </section>
    </div>
    
    <footer class="document-footer">
        <div class="document-footer-line1">
            Fort Homes QMS | Rev 1.0 | Eff: January 2026
        </div>
        <div class="document-footer-line2">
            ⚠ UNCONTROLLED WHEN PRINTED - Verify current revision
        </div>
    </footer>
    
    <script>
        // Populate document lists
        fetch('sops/').then(r => r.text()).then(html => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            const links = Array.from(doc.querySelectorAll('a'))
                .filter(a => a.href.endsWith('.html'))
                .map(a => `<li><a href="sops/${a.href.split('/').pop()}">${a.textContent}</a></li>`)
                .join('');
            document.getElementById('sop-list').innerHTML = links || '<li>No SOPs found</li>';
        }).catch(() => {
            document.getElementById('sop-list').innerHTML = '<li>Loading...</li>';
        });
        
        // Similar for other sections...
    </script>
</body>
</html>
EOF

echo -e "\n${GREEN}HTML build complete!${NC}"
echo -e "Output directory: ${YELLOW}$HTML_DIR${NC}"

# Build PDFs (optional - can be slow)
if [ "$1" == "--with-pdf" ] || [ "$1" == "--pdf" ]; then
    echo -e "\n${GREEN}Building PDF Documents...${NC}"
    echo "-----------------------------------"
    echo -e "${YELLOW}Note: PDF generation may take several minutes...${NC}\n"
    
    # Build SOP PDFs
    if [ -d "$DOCS_DIR/sops" ]; then
        echo -e "${YELLOW}Processing SOPs...${NC}"
        mkdir -p "$PDF_DIR/sops"
        for md_file in "$DOCS_DIR/sops"/*.md; do
            if [ -f "$md_file" ]; then
                filename=$(basename "$md_file" .md)
                build_pdf "$md_file" "$PDF_DIR/sops/${filename}.pdf" || true
            fi
        done
    fi
    
    echo -e "\n${GREEN}PDF build complete!${NC}"
    echo -e "Output directory: ${YELLOW}$PDF_DIR${NC}"
fi

echo -e "\n${GREEN}✓ Build completed successfully!${NC}"
echo ""
echo "To view the documentation, open:"
echo -e "  ${YELLOW}$HTML_DIR/index.html${NC}"
echo ""
