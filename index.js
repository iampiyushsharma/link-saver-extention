const inputBtn = document.getElementById("input-btn");
let myLead = [];
let oldLead = [];
const inputEl = document.getElementById("input-el");
const ulEl = document.getElementById("ul-el")
const dltBtn = document.getElementById("dlt-btn")
const undoBtn = document.getElementById("undo-btn");
const tabBtn = document.getElementById("tab-btn")
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLead"))

if(leadsFromLocalStorage){
    myLead= leadsFromLocalStorage;
    render(myLead)
}


dltBtn.addEventListener("dblclick",()=>{
    oldLead=JSON.parse(localStorage.getItem("myLead"))
    

    localStorage.clear();
    myLead=[];
    render(myLead);
    
})


undoBtn.addEventListener("click",()=>{
   render(oldLead)
})

tabBtn.addEventListener("click",()=>{
    chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
        myLead.push((tabs[0].url));
        localStorage.setItem("myLead",JSON.stringify(myLead))
        render(myLead)
    });
    
})


inputBtn.addEventListener("click",()=>{
   myLead.push(inputEl.value);
   inputEl.value=""
   localStorage.setItem("myLead",JSON.stringify(myLead))
   render(myLead)
   
})  


function render(leads){
    let listItems =""
    for(let i=0;i<leads.length;i++){
        listItems += 
        `<li>
            <a target='_blank' href='${leads[i]}'>
            ${leads[i]}
            </a>
        </li>`
    }
    ulEl.innerHTML=listItems;
}


