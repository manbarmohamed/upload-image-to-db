package com.example.demo.controller;

import com.example.demo.model.Produit;
import com.example.demo.repo.ProduitRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/produits")
@CrossOrigin("*")
public class ProduitController {

    @Autowired
    private ProduitRepository produitRepository;

    @PostMapping
    public ResponseEntity<Produit> createProduit(@RequestParam("name") String name,
                                                 @RequestParam("description") String description,
                                                 @RequestParam("image") MultipartFile file) {
        try {
            Produit produit = new Produit(name, description);
            produit.setImage(file.getBytes());
            Produit savedProduit = produitRepository.save(produit);
            return new ResponseEntity<>(savedProduit, HttpStatus.CREATED);
        } catch (IOException e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping
    public List<Produit> getAllProduits() {
        return produitRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Produit> getProduitById(@PathVariable Long id) {
        Optional<Produit> produit = produitRepository.findById(id);
        return produit.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/{id}/image")
    public ResponseEntity<byte[]> getProduitImage(@PathVariable Long id) {
        Optional<Produit> produit = produitRepository.findById(id);
        if (produit.isPresent() && produit.get().getImage() != null) {
            return ResponseEntity.ok().body(produit.get().getImage());
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
