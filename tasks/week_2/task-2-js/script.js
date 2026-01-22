window.onload = setup;

/** function setup */
function setup(){
console.log("we are a go!")
/*** ALL ANWSERS TO BE ADDED IN THE ALLOCATED SPACE */
/*** START PART ONE ACCESS */ 
/* 1: all paragraph elements */
/***CODE */

console.log(document.getElementsByTagName("p"));

/***OUTPUT:
 *  HTMLCollection(9)0: p#1accessKey: ""align: ""ariaActiveDescendantElement: nullariaAtomic: nullariaAutoComplete: nullariaBrailleLabel: nullariaBrailleRoleDescription: nullariaBusy: nullariaChecked: nullariaColCount: nullariaColIndex: nullariaColIndexText: nullariaColSpan: nullariaControlsElements: nullariaCurrent: nullariaDescribedByElements: nullariaDescription: nullariaDetailsElements: nullariaDisabled: nullariaErrorMessageElements: nullariaExpanded: nullariaFlowToElements: nullariaHasPopup: nullariaHidden: null ariaInvalid:
 */


/*************************************** */
/* 2: only the first paragraph element */
/***CODE */
console.log(document.getElementsByTagName("p")[0]);
/***OUTPUT: 
 * <p id=​"1">​" Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias perspiciatis blanditiis, et laborum praesentium earum. Enim facere, quia commodi voluptate, quis asperiores, pariatur ducimus officiis non quasi officia sit veniam! "</p>​
*/


/*************************************** */
/* 3: all elements with the class inner-container */
/***CODE */
console.log(document.getElementsByClassName("inner-container"));
/***OUTPUT: 
 * HTMLCollection(8)0: div.inner-container1: div.inner-container2: div.inner-container3: div.inner-container4: div.inner-container5: div.inner-container6: div.inner-container7: div.inner-containerlength: 8[[Prototype]]: HTMLCollection
 * 
*/


/*************************************** */
/* 4: the last image element inside the element that has the class img-container */
/***CODE */
let imgContainers = document.getElementsByClassName("img-container");
console.log(imgContainers[imgContainers.length - 1].getElementsByTagName("img")[0]);

/***OUTPUT: 
 * <img class=​"img-image" src=​"task-2-images/​seventeen.png">​
*/


/*************************************** */
/* 5A: all h2 elements */
/* 5B: length of the list in 5A */
/* 5C: the text content of the first element in the list from 5A */
/***CODE */
let h2Elements = document.getElementsByTagName("h2");
console.log(h2Elements);
console.log(h2Elements.length);
console.log(h2Elements[0].textContent);
/***OUTPUT: 
 * HTMLCollection(1)0: h2length: 1[[Prototype]]: HTMLCollection
 * 1
 * The header of this fancy page
*/

/*************************************** */
/* 6: the element with id name parent */
/***CODE */

console.log(document.getElementById("parent"));
/***OUTPUT: 
 * <section id=​"parent">​…​</section>​flex
 * 
 */

/*************************************** */
/*** END PART ONE ACCESS */ 









// /*************************************** */
// /*** START PART TWO MODIFY */ 
// /*************************************** */
// /* 1: Select the first paragraph and replace the text within the paragraph... */
// /***CODE */

// let firstParagraph = document.getElementsByTagName("p")[0];
// const name = "Diana";
// const date = new Date();
// firstParagraph.textContent = "New text in paragraph one: text changed by " + name + " on the following date: " + date.toDateString();
// /*************************************** */
// /* 2: Select all elements in the HTML that have the class name content-container
//  and change the background color ... of first and second ...*/
// /***CODE */
// let contentContainers = document.getElementsByClassName("content-container");
// contentContainers[0].style.backgroundColor = "orange";
// contentContainers[1].style.backgroundColor = "purple";

// /*************************************** */
// /* 3: Change the src element of the first image element on the page to be ...
// /***CODE */
// let firstImage = document.getElementsByTagName("img")[0];
// firstImage.src = "task-2-images/seven.png";

// /*************************************** */
// /* 4: Select the third paragraph element on the page and 
// replace the content (within the paragraph) to be an h2 element which contains the text `TEST 123`
// /***CODE */
// let thirdParagraph = document.getElementsByTagName("p")[2];
// thirdParagraph.innerHTML = "<h2>TEST 123</h2>";

// /*************************************** */
// /* 5: Select the fourth paragraph element on the page and 
// add to the existing content an h2 element containing the text `TEST 123`
// /***CODE */
// let fourthParagraph = document.getElementsByTagName("p")[3];
// fourthParagraph.innerHTML += "<h2>TEST 123</h2>";

// /*************************************** */
// /* 6: Select the fifth paragraph element on the page and add to the existing content 
// an img element that holds `one.png`, and add the class newStyle to said paragraph element.
// /***CODE */
// let fifthParagraph = document.getElementsByTagName("p")[4];
// fifthParagraph.innerHTML += "<img src='task-2-images/one.png' alt='one'>";
// fifthParagraph.classList.add("newStyle");


// /*************************************** */
// /* 7: Add the following array variable: let colors = ['red','blue','green','orange'];, 
// then access all elements with class name inner-container and save to a variable called `innerContainers`. 
// Next, iterate over the colors array, and for each color: 
// assign the element from innerContainers variable with the same index 
// (i.e. colors[0] should be allocated to the first innerContainers element, colors[1] to the second, etc ...) 
// a background using that color.
// /***CODE */
// let colors = ['red','blue','green','orange'];
// let innerContainers = document.getElementsByClassName("inner-container");
// for(let i = 0; i < colors.length; i++){
//     innerContainers[i].style.backgroundColor = colors[i];
// }

// /*************************************** */
// /*** END PART TWO MODIFY */ 








// /*************************************** */
// /*** START PART THREE CREATE */ 
// /*************************************** */
// /* 1: NEW PARAGRAPHS */
// /* 1A: Access all paragraph elements, and store the result in a variable called: allPTagsThree */
// /* 1B: Create a function:function customCreateElement(parent){ //body } */
// /* 1C:  In the body of customCreateElement create a new parargraph element*/
// /* 1D:  Set the text of this element to be : `using create Element`*/
// /* 1E:  Set the background of this paragraph element to be green */
// /* 1F:  Set the color of the text in this paragraph element to be white */
// /* 1G: Append this new element to the parent variable within the function. */
// /* 1H: Iterate through the allPTagsThree array and call customCreateElement(), 
// passing the current allPTagsThree element as the parent with each iteration.*/
// /***CODE */
// let allPTagsThree = document.querySelectorAll("p");

// function customCreateElement(parent){
//     let newParagraph = document.createElement("p");
//     newParagraph.textContent = "using create Element";
//     newParagraph.style.backgroundColor = "green";
//     newParagraph.style.color = "white";
//     parent.appendChild(newParagraph);
// }

// for(let i = 0; i < allPTagsThree.length; i++){
//     customCreateElement(allPTagsThree[i]);

// }

// /***EXPLANATION::
//  * The code finds all the paragraph elements and appends a new green and white paragraph block to each of them.
//  * 
//  */







/*************************************** */
/* 2: GRID OF BOXES */
/* 2A: Create another new function: function customNewBoxCreate(parent){ //body }*/
/* 2B: In the body of customNewBoxCreate create a new div element, that has the class testDiv. 
/* 2C:Then append this new element to the parent variable within the function. 
/* 2D:Finally, return</code> this new element */
/* 2E:Create a nested for loop (for rows and columns) to iterate through 10 columns and 10 rows (just like the JS Review :)). 
    Call the customNewBoxCreate function, in order to generate a new div -> representing each cell in the grid. 
    Ensure that the parent element for each of these new divs is the element whose id is named `new-grid`*/
/* 2F: You will see at this point that the x,y position of the resulting divs makes no sense... 
    Fix this by doing the following: every time you call customNewBoxCreate() - save the current returned element 
    in a variable i.e. returnedDiv. 
    Set the style (left and top) to the of this element to 
    the necessary x and y position (use the counter variables in the for nested for loop to 
    calculate the new positions.
/* 2G: BONUS I: Make every div in the resulting grid in an even numbered row have white background 
    and otherwise let it have a background of purple.</li>
/* 2H: BONUS II: For every div in an even numbered row make it contain the text `EVEN`, 
    otherwise lat it have the content `ODD`.*/

/***CODE */
function customNewBoxCreate(parent){
    let newDiv = document.createElement("div");
    newDiv.classList.add("testDiv");
    parent.appendChild(newDiv);
    return newDiv;
}

let newGrid = document.getElementById("new-grid");

for(let row = 0; row < 10; row++){
    for(let col = 0; col < 10; col++){
        let returnedDiv = customNewBoxCreate(newGrid);
        returnedDiv.style.left = (col * 50) + "px";
        returnedDiv.style.top = (row * 50) + "px";

        if(row % 2 === 0){
            returnedDiv.style.backgroundColor = "white";
            returnedDiv.textContent = "EVEN"; 
        } else {
            returnedDiv.style.backgroundColor = "purple";
            returnedDiv.textContent = "ODD"; 
        }
    }

}
/***EXPLANATION::
 * Creates a 10x10 grid of divs underneath the box with the text "FIRST GRID".
 * Each even row has a white background and contains the text "EVEN",
 * Each odd row has a purple background and contains the text "ODD".
 */

/*************************************** */
/* 3: GRID OF BOXES II */

/* 3A: Create ANOTHER nested for loop - in order to generate a new grid ... 
    USE the same customNewBoxCreate function..., the only difference is that the parent element 
    for each of these new divs is the element whose id is `new-grid-three`. */
/* 3B: Then: write the code to check when a column is a multiple of 3 (no remainder), 
    when it is a column where the remainder is 1 or when the remainder is 2 ... 
    HINT:: look up the % operator.. */
/* 3C: Then for each of the above cases: give the new divs in the first case a background of red, 
        then the second a background of orange and the third yellow. */
/*  3D: Finally, let each div contain the text content representing the associated remainder 
    when dividing by three. */

/***CODE */

let newGridThree = document.getElementById("new-grid-three");

for(let row = 0; row < 10; row++){
    for(let col = 0; col < 10; col++){
        let returnedDiv = customNewBoxCreate(newGridThree);
        returnedDiv.style.left = (col * 50) + "px";
        returnedDiv.style.top = (row * 50) + "px";
        
        let remainder = col % 3;

        switch(remainder){
            case 0:
                returnedDiv.style.backgroundColor = "red";
                returnedDiv.textContent = "0";
                break;
            case 1:
                returnedDiv.style.backgroundColor = "orange";
                returnedDiv.textContent = "1";
                break;
            case 2:
                returnedDiv.style.backgroundColor = "yellow";
                returnedDiv.textContent = "2";
                break;
        }
    }
}

/***EXPLANATION::
 * Creates another 10x10 grid of divs underneath the box with the text "SECOND GRID".
 * Each column that is a multiple of 3 has a red background and contains the text "0",
 * Each column with a remainder of 1 when divided by 3 has an orange background and contains the text "1",
 * Each column with a remainder of 2 when divided by 3 has a yellow background and contains the text "2".
 */

/*************************************** */
/*** END PART THREE CREATE */ 
/*************************************** */
    
}