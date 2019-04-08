package com.css;

public class ShapeTest {
    public static void main(String[] args) {
        ShapeProduct sp=new ShapeProduct();
        Square squ=(Square)sp.getShape("square");
        Triangle tri =(Triangle)sp.getShape("triangle");
        System.out.println(squ.getMyShape());
        System.out.println(tri.getMyShape());
    }
}
