const $ = (selector) => document.querySelector(selector);


function App() {

    // form 태그가 자동으로 전송되는걸 막는다
    document
      $("#espresso-menu-form")
      .addEventListener("submit", (e) => {
        e.preventDefault();
      });
      
      const addMenuName = () => {
       // 값을 입력하지 않고 엔터를 누른경우 예외처리
       if ($("#espresso-menu-name").value === "") {
        alert("값을 입력해주세요.");
        return;
      }

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
      $("#espresso-menu-list").insertDjacentHTML(
        "beforeend", 
        menuItemTemplate(espressoMenuName)
      );

      const menuCount = $("#espresso-menu-list").querySelectorAll("li").length;
      $(".menu-count").innerText = `총 ${menuCount} 개`;
      $("#espresso-menu-name").value = ""; 
      };


      }

    $("#espresso-menu-submiit-button").addEventListener("click", () => {
      addMenuName();
    })  


     

    // 메뉴 이름 입력받기  
    document
      $("#espresso-menu-name")
      .addEventListener("keypress", (e) => {
        if (e.key !== "Enter") {
            return;
        }
        addMenuName();
        
       
      });
}