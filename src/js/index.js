const $ = (selector) => document.querySelector(selector);

const store = {
  setLocalStorage(menu) {
    localStorage.setItem("menu", JSON.stringify(menu));
  },
  getLocalStorage() {
    localStorage.getItem("menu");
  }
}


function App() {
  // 상태는 변하는 데이터, 이 앱에서 변하는 것이 무엇인가 - 메뉴명 
  this.menu = [];

  const updateMenuCount  = () => {
    const menuCount = $("#espresso-menu-list").querySelectorAll("li").length;
    $(".menu-count").innerText = `총 ${menuCount} 개`;
  }
  
  const addMenuName = () => {
    // 값을 입력하지 않고 엔터를 누른경우 예외처리
    if ($("#espresso-menu-name").value === "") {
      alert("값을 입력해주세요.");
      return;
    }

    if (e.key === "Enter") {
      const espressoMenuName = $("#espresso-menu-name").value;   
      this.menu.push({ name: espressoMenuName}); 
      store.setLocalStorage(this.menu);
      const template = this.menu.map((item) => {
        return `<li class="menu-list-item d-flex items-center py-2">
                  <span class="w-100 pl-2 menu-name">${item.name}</span>
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
      })
      .join("");

      
    $("#espresso-menu-list").innerHTML = template;
    updateMenuCount();
    $("#espresso-menu-name").value = ""; 
    };
  }

  const updateMenuName = (e) => {
    const $menuName = e.target.closest("li").querySelector(".menu-name").innerText;    
    const updatedMenuName = prompt("메뉴명을 수정하세요", $menuName.innerText);
    $menuName.innerText = updatedMenuName;
  }
  
  const removeMenuName = (e) => {
    if (confirm("정말 삭제하시겠습니까?")) {
      e.target.closest("li").remove(); 
      updateMenuCount();
    }
  }

  $("#espresson-menu-list").addEventListener("click", (e) => {
    if (e.target.classList.contains("menu-edit-button")) {
      updateMenuName(e);
    }

    // 메뉴 삭제
    if (e.target.classList.contains("menu-remove-button")) {
      removeMenuName(e);
    }
  });

  // form 태그가 자동으로 전송되는걸 막는다
  document
    $("#espresso-menu-form")
    .addEventListener("submit", (e) => {
      e.preventDefault();
    }
  );
    
  $("#espresso-menu-submiit-button").addEventListener("click", addMenuName);  

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

App();