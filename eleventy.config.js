import * as sass from 'sass';
import path from 'node:path';
import fs from 'node:fs';

export default async function(eleventyConfig) {
    // Limpiar carpeta _site solo en build inicial (no en watch)
    eleventyConfig.on('eleventy.before', async ({ runMode }) => {
        if (runMode === 'build') {
            const outputDir = '_site';
            if (fs.existsSync(outputDir)) {
                fs.rmSync(outputDir, { recursive: true });
            }
        }
    });
    // Configuración para compilar Sass
    eleventyConfig.addTemplateFormats("scss");

    eleventyConfig.addExtension("scss", {
        outputFileExtension: "css",
        compile: async function(inputContent, inputPath) {
            let parsed = path.parse(inputPath);
            if (parsed.name.startsWith("_")) return;

            return async (data) => {
                let result = sass.compileString(inputContent, {
                    loadPaths: [parsed.dir || "."],
                    sourceMap: false
                });
                return result.css;
            };
        },
        compileOptions: {
            permalink: function(contents, inputPath) {
                let parsed = path.parse(inputPath);
                if (parsed.name.startsWith("_")) return false;
                return `assets/css/${parsed.name}.css`;
            }
        }
    });

    // Copiar imágenes
    eleventyConfig.addPassthroughCopy("src/assets/img");

    return {
        dir: {
            input: "src",
            output: "_site",
            includes: "_includes"
        }
    };
};