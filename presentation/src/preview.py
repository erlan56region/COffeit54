import sys, pathlib
import pypdfium2 as pdfium
pdf = pdfium.PdfDocument(str(pathlib.Path(__file__).parents[1] / "coffeeIT-presentation.pdf"))
out = pathlib.Path(__file__).parents[1] / "preview"
out.mkdir(exist_ok=True)
for i in range(len(pdf)):
    page = pdf[i]
    bmp = page.render(scale=1.0)
    bmp.to_pil().save(out / f"p{i+1:02d}.png")
print("pages", len(pdf))
