import { $ } from "./utils/dom.js";
import store from "./store/index.js";

const $ = (selector) => document.querySelector(selector);

const BASE_URL = "http://localhost:3000/api";

const MenuAPi = {
 async getAllMenuByCategory(category) {
    const response = await fetch(`${BASE_URL}/category/${category}/menu`)
    return response.json();
  },

  async createMenu(category, name) {
   const response = await fetch(`${BASE_URL}/category/${category}/menu`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),   
    });
    if (!response.ok) {
        console.error("에러가 발생했습니다.");
    }
  },
}

function App() {
  // 상태는 변하는 데이터, 이 앱에서 변하는 것이 무엇인가 - 메뉴명 
  this.menu = {
    espresson: [],
    frappuccino: [],
    blended: [],
    teavana: [],
    desert: [],
  };

  this.currentCategory = "espresso";
  

  this.init = async () => {
    this.menu[this.currentCategory] = MenuAPi.getAllMenuByCategory(this.currentCategory);
    render();
    initEventListeners();
  };

  const render = () => {
    const template = this.menu[this.currentCategory].map((menuItem, index) => {
      return `<li data-menu-id="${index}" class=" menu-list-item d-flex items-center py-2">
                <span class="w-100 pl-2 menu-name ${menuItem.soldOut ? "sold-out" : ""}">${item.name}</span>
                <button
                  type="button"
                  class="bg-gray-50 text-gray-500 text-sm mr-1 menu-sold-out-button"
                >
                  품절
                </button>
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

    
  $("#menu-list").innerHTML = template;
  updateMenuCount();
  }

  const updateMenuCount  = () => {
    $(".menu-count").innerText = `총 ${this.menu[this.currentCategory].length} 개`;
  }
  
  const addMenuName = async () => {
    // 값을 입력하지 않고 엔터를 누른경우 예외처리
    if ($("#espresso-menu-name").value === "") {
      alert("값을 입력해주세요.");
      return;
    }

    if (e.key === "Enter") {
      const menuName = $("#menu-name").value;
      await MenuAPi.createMenu(this.currentCategory, menuName);
      this.menu[this.currentCategory] = await MenuAPi.getAllMenuByCategory(this.currentCategory);
      render();
      $("#espresso-menu-name").value = ""; 
    };
  }

  const updateMenuName = (e) => {
    const menuId = e.target.closest("li").dataset.menuId;
    const $menuName = e.target.closest("li").querySelector(".menu-name").innerText;    
    const updatedMenuName = prompt("메뉴명을 수정하세요", $menuName.innerText);
    this.menu[this.currentCategory][menuId].name = updatedMenuName;
    store.setLocalStorage(this.menu);
    render();
  }
  
  const removeMenuName = (e) => {
    if (confirm("정말 삭제하시겠습니까?")) {
      const menuId = e.target.closest("li").dataset.menuId;
      this.menu.splice(menuId, 1);
      render();
    }
  }

  const soldOutMenu = (e) => {
    const menuId = e.target.closest("li").dataset.menuId;
    this.menu[this.currentCategory].soldOut = !this.menu[this.currentCategory].soldOut;
    store.setLocalStorage(this.menu);
  }

  const initEventListeners = () => {
    $("#menu-list").addEventListener("click", (e) => {
      if (e.target.classList.contains("menu-edit-button")) {
        updateMenuName(e);
        return;
      }


      $("nav").addEventListener("click", async (e) => {
        const isCategoryButton = e.target.classList.contains("cafe-category-name")
        if (isCategoryButton) {
          const categoryName = e.target.dataset.categoryName;
          this.currentCategory = categoryName;
          $("#category-title").innerText = `${e.target.innerText} 메뉴관리`;
          await MenuAPi.getAllMenuByCategory(this.currentCategory);
          render();
        }  
      });

      // 메뉴 이름 입력받기  
      $("#menu-name")
      .addEventListener("keypress", (e) => {
        if (e.key !== "Enter") {
            return;
        }
        addMenuName();
      });

      // form 태그가 자동으로 전송되는걸 막는다
      $("#menu-form")
      .addEventListener("submit", (e) => {
        e.preventDefault();
      });

      // 메뉴 삭제
      if (e.target.classList.contains("menu-remove-button")) {
        removeMenuName(e);
        return;
      }
  
      if (e.target.classList.contains("menu-sold-out-button")) {
        soldOutMen(e);
        return;
      }
    });
  }

    
  $("#espresso-menu-submiit-button").addEventListener("click", addMenuName);  

  

 

}



const app = new App();
app.init();