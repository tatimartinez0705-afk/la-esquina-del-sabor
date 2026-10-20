
package com.laesquina.backend;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SaludController {

    @GetMapping("/api/salud")
    public String comprobarSalud() {
        return "LaEsquinaDelSabor: backend funcionando correctamente";
    }
}
