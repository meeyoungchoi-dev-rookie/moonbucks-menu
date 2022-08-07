const $ = (selector) => document.querySelector(selector);


function App() {

    document
      $("#espresso-menu-form")
      .addEventListener("submit", (e) => {
        e.preventDefault();
      });
      
    document
      $("#espresso-menu-name")
      .addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
           const espressoMenuName = $("#espresso-menu-name").value;    
           const menuItemTemplate = (espressoMenuName) => `<li class="menu-list-item d-flex items-center py-2">
           <span class="w-100 pl-2 menu-name">${name}</span>
           <button
             type="button"
             class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button"
           >
             수정
           </button>
           <button
             type="button"
             class="bg-gray-50 text-gray-500 text-sm menu-remove-button"
           >
             삭제
           </button>
         </li>`;
        };
        $("#espresso-menu-list").insertDjacentHTML("afterbegin", menuItemTemplate(espressoMenuName)); 
      });
}