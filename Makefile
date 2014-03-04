docs: index.html
	docco comparators.spec.js -t template.jst -c docco.css
	mv docs/comparators.spec.html index.html
	mv docs/* .
	rm -r docs
