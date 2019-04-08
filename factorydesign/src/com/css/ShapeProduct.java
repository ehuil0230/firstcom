package com.css;

public class ShapeProduct {
    public Shape getShape(String type){
        if(type==null||"".equals(type)){
            return null;
        }else if("triangle".equals(type)){
            return new Triangle();
        }else if("square".equals(type)){
            return new Square();
        }else{
            return null;
        }
    }
}
