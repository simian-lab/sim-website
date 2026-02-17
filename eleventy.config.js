import * as sass from 'sass';
import path from 'node:path';
import fs from 'node:fs';

export default async function(eleventyConfig) {
    // Limpiar carpeta public solo en build inicial (no en watch)
    eleventyConfig.on('eleventy.before', async ({ runMode }) => {
        if (runMode === 'build') {
            const outputDir = 'public';
            if (fs.existsSync(outputDir)) {
                fs.rmSync(outputDir, { recursive: true });
            }
        }
    });

    // --- CONFIGURACIÓN DE VIGILANCIA (WATCH) ---
    // Forzar a Eleventy a vigilar cambios en la carpeta JS
    eleventyConfig.addWatchTarget("src/assets/js/");

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

    /*Copiar Js*/
    eleventyConfig.addPassthroughCopy("src/assets/js");

    // Copiar imágenes
    eleventyConfig.addPassthroughCopy("src/assets/img");

    // Copiar fuentes (Solución a tu problema)
    // Esto copiará src/assets/fonts/ a public/assets/fonts/
    eleventyConfig.addPassthroughCopy("src/assets/fonts");    

    return {
        dir: {
            input: "src",
            output: "public",
            includes: "_includes"
        }
    };
};