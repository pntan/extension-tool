// ==UserScript==
// @name         Công Cụ Hỗ Trợ Sàn TMĐT
// @namespace    http://tampermonkey.net/
// @version      2025-01-02
// @description  Bộ công cụ tích hợp các chức năng hỗ trợ cho sàn TMĐT
// @author       TanPhan
// @match        https://banhang.shopee.vn/*
// @match        https://sellercenter.lazada.vn/*
// @match        https://seller-vn.tiktok.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=http://anonymouse.org/
// @grant        none
// ==/UserScript==
// @require      https://code.jquery.com/jquery-3.7.1.min.js
/* globals       jQuery, $, waitForKeyElements */

(function() {
    'use strict';
    window.onload = function(){
        function GM_addStyle(css) {
            const style = document.getElementById("GM_addStyleBy8626") || (function() {
                const style = document.createElement('style');
                style.type = 'text/css';
                style.id = "GM_addStyleBy8626";
                document.head.appendChild(style);
                return style;
            })();
            const sheet = style.sheet;
            sheet.insertRule(css, (sheet.rules || sheet.cssRules || []).length);
        }

        // Dựng giao diện
        function createLayout(){
            // Khung ngoài cùng
            const container = document.createElement("div");
            container.id = ("tp-container");

            // Nút mở rộng
            const toggleButton = document.createElement("button");
            toggleButton.id = ("tp-toggle-button");
            toggleButton.textContent = ("Công Cụ Mở Rộng");

            // Phần tab
            const panel = document.createElement("div");
            panel.classList.add("tp-panel");

            // Đầu tab
            const tabContent = document.createElement("div");
            tabContent.classList.add("tp-tab-content");

            const buttonTab1 = document.createElement("button");
            buttonTab1.classList.add("tablink");
            buttonTab1.id = ("shopee");
            buttonTab1.textContent = ("Sàn Cam");

            /*const buttonTab1Text = document.createTextNode("Sàn Cam");
            buttonTab1.appendChild(buttonTab1Text);*/

            const buttonTab2 = document.createElement("button");
            buttonTab2.classList.add("tablink");
            buttonTab2.id = ("lazada");
            buttonTab2.textContent = ("Sàn L");

            /*const buttonTab2Text = document.createTextNode("Sàn L");
            buttonTab2.appendChild(buttonTab2Text);*/

            const buttonTab3 = document.createElement("button");
            buttonTab3.classList.add("tablink");
            buttonTab3.id = ("tiktok");
            buttonTab3.textContent = ("Tóp Tóp");

            /*const buttonTab3Text = document.createTextNode("Tóp Tóp");
            buttonTab3.appendChild(buttonTab3Text);*/

            panel.appendChild(buttonTab1);
            panel.appendChild(buttonTab2);
            panel.appendChild(buttonTab3);

            // Nội dung tab
            const tab1 = document.createElement("div");
            tab1.classList.add("tab-content");
            tab1.id = ("tab1");
            const tab2 = document.createElement("div");
            tab2.classList.add("tab-content");
            tab2.id = ("tab2");
            const tab3 = document.createElement("div");
            tab3.classList.add("tab-content");
            tab3.id = ("tab3");

            tabContent.appendChild(tab1);
            tabContent.appendChild(tab2);
            tabContent.appendChild(tab3);

            // Chức năng sàn cam
            const func1Tab1 = document.createElement("button");
            func1Tab1.textContent = ("Cập Nhật Giá Đuôi");
            func1Tab1.id ="f1t1";
            tab1.appendChild(func1Tab1);

            const func2Tab1 = document.createElement("button");
            func2Tab1.textContent = ("Đang phát triển");
            func2Tab1.id ="f2t1";
            tab1.appendChild(func2Tab1);

            // Chức năng sàn l
            const func1Tab2 = document.createElement("button");
            func1Tab2.textContent = ("Cập Nhật Giá Đuôi");
            func1Tab2.id = "f1t2";
            tab2.appendChild(func1Tab2);

            const func2Tab2 = document.createElement("p");
            func2Tab2.textContent = ("Hiện đang phát triển");
            tab2.appendChild(func2Tab2);

            // Chức năng sàn tóp tóp
            const func1Tab3 = document.createElement("p");
            func1Tab3.textContent = ("Hiện chưa có chức năng");
            tab3.appendChild(func1Tab3);

            container.appendChild(toggleButton);
            container.appendChild(panel);
            container.appendChild(tabContent);
            document.body.appendChild(container);

            // Css
            container.style.position = 'fixed';
            container.style.bottom = '20px';
            container.style.right = '5%';
            container.style.zIndex = '999';
            container.style.background = "grey";
            container.style.color = "#fff";

            toggleButton.style.width = "100%";
            toggleButton.style.textAlign = "center";
            toggleButton.style.padding = "1vh 1vw";
            toggleButton.style.background = 'crimson';
            toggleButton.style.color = "#fff";

            panel.style.display = "flex";
            panel.style.alignItem = "center";
            panel.style.justtifyContent = "center";
            panel.style.gap = "1vw";
            panel.style.width = "35vw";
            panel.style.display = "none";

            buttonTab1.style.textAlign = "center";
            buttonTab1.style.height = "fit-content";
            buttonTab1.style.padding = "0.5vh 1vw";
            buttonTab1.style.background = "#ee4d2d"
            buttonTab1.style.width = "100%";


            buttonTab2.style.textAlign = "center";
            buttonTab2.style.height = "fit-content";
            buttonTab2.style.padding = "0.5vh 1vw";
            buttonTab2.style.background = "#1a71ff";
            buttonTab2.style.width = "100%";

            buttonTab3.style.textAlign = "center";
            buttonTab3.style.height = "fit-content";
            buttonTab3.style.padding = "0.5vh 1vw";
            buttonTab3.style.background = "#121212";
            buttonTab3.style.color = "#fff";
            buttonTab3.style.width = "100%";

            tabContent.style.width = "100%";
            tabContent.style.marginTop = "2vh";
            tabContent.style.display = "none";
            tabContent.style.color = "#fff";
            tabContent.style.flexDirection = "colum";

            tab1.style.width = "100%";
            tab1.style.height = "auto";
            tab1.style.minHeight = "20vh";
            tab1.style.maxHeight = "50vh";
            tab1.querySelectorAll("button").forEach((current, index) => {
                current.style.color = "#000";
            })

            tab2.style.width = "100%";
            tab2.style.height = "auto";
            tab2.style.minHeight = "20vh";
            tab2.style.maxHeight = "50vh";
            tab2.style.display = "none";
            tab2.querySelectorAll("button").forEach((current, index) => {
                current.style.color = "#000";
            })

            tab3.style.width = "100%";
            tab3.style.height = "auto";
            tab3.style.minHeight = "20vh";
            tab3.style.maxHeight = "50vh";
            tab3.style.display = "none";
            tab3.querySelectorAll("button").forEach((current, index) => {
                current.style.color = "#000";
            })
        }
        createLayout();

        // Đóng giao diện
        document.querySelector("#tp-toggle-button").addEventListener("click", (e) => {

        });

        // Mở giao diện
        document.querySelector("#tp-toggle-button").addEventListener("click", (e) => {
            var frame = document.querySelector("#tp-container");
            var panel = document.querySelector(".tp-panel");
            var content = document.querySelector(".tp-tab-content");
            if(frame.classList.contains("active")){
                panel.style.display = "none";
                content.style.display = "none";
                e.target.textContent = "Công Cụ Mở Rộng";
                frame.classList.remove("active");
            }else{
                panel.style.display = "flex";
                content.style.display = "flex";
                e.target.textContent = "Đóng";
                document.querySelector("#tp-container").classList.add("active");
            }
        });

        // Chọn tab
        document.querySelectorAll(".tablink").forEach((current, index) => {
            current.addEventListener("click", (e) => {
                var tab1 = document.querySelector("#tp-container #tab1");
                var tab2 = document.querySelector("#tp-container #tab2");
                var tab3 = document.querySelector("#tp-container #tab3");
                switch (e.target.id){
                    case "shopee":
                        tab1.style.display = "inline";
                        tab2.style.display = "none";
                        tab3.style.display = "none";
                        break;

                    case "lazada":
                        tab1.style.display = "none";
                        tab2.style.display = "inline";
                        tab3.style.display = "none";
                        break;

                    case "tiktok":
                        tab1.style.display = "none";
                        tab2.style.display = "none";
                        tab3.style.display = "inline";
                        break;
                }
            })
        });

        // Chức năng cập nhật giá đuôi sàn cam
        document.querySelector("#f1t1").addEventListener("click", () => {
            console.log("CẬP NHẬT GIÁ ĐUÔI");
            var tien = document.querySelectorAll(".currency-input .eds-input__input");
            var phanTram = document.querySelectorAll(".discount-input .eds-input__input");

            tien.forEach((current, index) => {
                var parent = current.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;
                if(parent.querySelectorAll(".discount-item-selector input")[0].checked){
                    var giaGoc = current.value
                    var giaDuoi = giaGoc.slice(-3, current.value.length);
                    var giaGiam;
                    if(giaDuoi != "000"){
                        giaGiam = giaDuoi + "000";

                        giaGiam = parseInt(giaGiam);
                        giaGoc = parseInt(giaGoc);

                        while(giaGiam > giaGoc){
                            giaGiam = giaGiam.toString().slice(0, -1);
                            console.log(giaGiam);
                        }

                        var phanTramGiam = (giaGiam / giaGoc) * 100;

                        current.select();
                        current.value = giaGiam;
                        if (window.getSelection) {
                            window.getSelection().removeAllRanges();
                        }else if (document.selection) {
                            document.selection.empty();
                        }

                        if ("createEvent" in document) {
                            var evt = document.createEvent("HTMLEvents");
                            evt.initEvent("change", false, true);
                            current.dispatchEvent(evt);
                        }
                        else
                            current.fireEvent("onchange");
                    }
                }
            });
        });

        // Chắc năng cập nhật giá đuôi sàn L
        document.querySelector("#f1t2").addEventListener("click", () => {
            var row = document.querySelectorAll(".next-table-row");

            var i = 0;
            row.forEach((current, index) => {
                var giaGoc = (current.children[1].querySelector("input").value);
                giaGoc = giaGoc.split(",");
                giaGoc = giaGoc.join("");

                var giaDuoi = giaGoc.slice(-3, giaGoc.length);
                var giaGiam;

                if(giaDuoi != "000"){
                    giaGiam = giaDuoi + "000";

                    giaGiam = parseInt(giaGiam);
                    giaGoc = parseInt(giaGoc);

                    while(giaGiam > giaGoc){
                        giaGiam = giaGiam.toString().slice(0, -1);
                    }

                    current.children[2].querySelector("button").click();

                    document.querySelectorAll(".next-balloon-content input")[i].value = giaGiam.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

                    i++;
                    return;

                    /*var boxSpecialPrice = document.createElement("span");
                    boxSpecialPrice.classList.add("special-price-label");

                    var span = document.createElement("span");
                    span.classList.add("number-text-scope");
                    span.setAttribute("titile", "price");
                    span.textContent = giaGiam.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

                    boxSpecialPrice.appendChild(span);

                    current.children[2].querySelector(".special-price").appendChild(boxSpecialPrice);*/

                }
            })
            navigator.clipboard.writeText('document.querySelectorAll(".next-balloon-content .action-wrapper button.next-btn-primary").forEach((current, index) => {current.click()})');
            alert("Code lỏ nên chịu khó Bấm F12 > Console rồi dán code ra chạy hen ^_^");
        });
    }
})();
