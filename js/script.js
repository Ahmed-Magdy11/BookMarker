
BookNameInput=document.getElementById("Site Name");
URLInput=document.getElementById("Site URL");
var regexOfUrl=/^(http)(s)?\/\/:\w{5,}\.[a-z]{2,3}$/i;
var regexOfName=/^[A-Z][a-zA-Z]{3,}/g;

var bookContainer ;
if (localStorage.getItem("Books")==null) {
    bookContainer=[];
}
else{
    bookContainer=JSON.parse(localStorage.getItem("Books"))
    display(bookContainer);
}



function addBook(){
    if(Validate(URLInput,regexOfUrl) && Validate(BookNameInput,regexOfName))
        
        {
        var book={
            BookName:BookNameInput.value,
            BookURL:URLInput.value
            };
            bookContainer.push(book);
            localStorage.setItem("Books",JSON.stringify(bookContainer));
            clear();
            // console.log(bookContainer);
            display(bookContainer);
            URLInput.classList.remove("is-valid");
            BookNameInput.classList.remove("is-valid");
    }

}





function clear(){
    BookNameInput.value="";
    URLInput.value=""
}


function display(List){
    var cartona=``;
for (var i = 0;i < List.length;i++) {

    cartona+=`            <tr>
                <td>${i}</td>
                <td>${List[i].BookName}</td>
                <td><button class="btn btn-success " id="visitBtn" onclick="Visit_URL(${i})">
                <i class="fa-solid fa-eye"></i>
                Visit</button></td>
                <td><button class="btn btn-danger" onclick="deleteBook(${i})">
                <i class="fa-solid fa-trash"></i>
                Delete</button></td>
            </tr>`;
}
document.getElementById("bodyOfTable").innerHTML=cartona;
}



function deleteBook(i){
bookContainer.splice(i,1);
localStorage.setItem("Books",JSON.stringify(bookContainer));
display(bookContainer);

}




function Validate(x,regex){
if(regex.test(x.value)){

    x.classList.add("is-valid");
    x.classList.remove("is-invalid");
    
    return true;
}
else{
    x.classList.add("is-invalid");
    x.classList.remove("is-valid");
    

    return false;
}
}



function Visit_URL(x){
document.getElementById("visitBtn").addEventListener("click",function(){
window.open(bookContainer[x].BookURL,"_blanck")
});
}