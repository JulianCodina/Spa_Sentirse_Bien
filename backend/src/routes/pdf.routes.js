/*Ruta de prueba para devolver el PDF*/

import { Router } from 'express'
import { buildPDF } from '../libs/pdfkit.js';

const router = Router();

router.get('/pdf', (req, res) => {

    // establece los encabezados de la respuesta HTTP
    res.writeHead(200, {
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename= Resumen.pdf"
    });

    buildPDF(
        (data) => res.write(data), 
        () => res.end()
    );

});

export default router