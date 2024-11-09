import { CategoryListType } from "../interfaces/CategoryList";

const BASE_URL = "http://localhost:5050/categoryList"

export async function getCategoryLists(){
    try {
        const response = await fetch(`${BASE_URL}/`, {
            method: "GET",
        });
    
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response
    } catch (error) {
        console.error("A problem occured with retrieving category lists", error);
    }
}

export async function getCategoryList(id: string){
    try {
        const response = await fetch(`${BASE_URL}/${id}`, {
            method: "GET",
        });
    
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response
    } catch (error) {
        console.error("A problem occured with retrieving category list " + id, error);
    }
}

export async function postCategoryList(categoryList: CategoryListType){
    try {
        const response = await fetch(`${BASE_URL}/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(categoryList)
        });
    
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response
    } catch (error) {
        console.error("A problem occured with creating category list", error);
    }
}

export async function addToCategoryList(categoryListId: string, itemId: string){
    try {
        const response = await fetch(`${BASE_URL}/${categoryListId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ itemId }),
        });
    
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response
    } catch (error) {
        console.error(`A problem occured with adding item ${categoryListId} to category list ${itemId}`, error);
    }
}

export async function deleteCategoryList(id: string){
    try {
        const response = await fetch(`${BASE_URL}/${id}`, {
            method: "DELETE",
        });
    
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response
    } catch (error) {
        console.error("A problem occured with deleting category list " + id, error);
    }
}

// req.body in POST/PUT
// req.params attached to url
// req.query for searching, filtering