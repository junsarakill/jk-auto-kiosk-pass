// ==UserScript==
// @name         키오스크 자동 입력
// @namespace    http://tampermonkey.net/
// @version      0.1
// @author       JKAKK
// @match        https://kio.ac/*
// @updateURL    https://raw.githubusercontent.com/junsarakill/jk-auto-kiosk-pass/main/JKAKP.user.js
// @downloadURL  https://raw.githubusercontent.com/junsarakill/jk-auto-kiosk-pass/main/JKAKP.user.js
// ==/UserScript==

(function()
{
    'use strict';

    // 입력할 임시 값
    const targetValue = "somisoft";

    // 자동 클릭 여부를 결정하는 플래그
    const shouldSubmit = true;

    // 타임아웃 설정 (밀리초 단위, 예: 10초 = 10000)
    const timeoutLimit = 10000; 
    const intervalTime = 300;
    let elapsedTime = 0;

    // 페이지 로딩 후 요소가 나타날 때까지 주기적으로 탐색
    const timer = setInterval(() =>
    {
        const inputField = document.querySelector('input[placeholder="비밀번호 입력..."]');

        if (inputField)
        {
            // 요소를 찾았으므로 반복 타이머 중지
            clearInterval(timer);

            // 값 입력
            inputField.value = targetValue;

            // 웹 프레임워크가 변경 사항을 인식할 수 있도록 이벤트 발생
            inputField.dispatchEvent(new Event('input', { bubbles: true }));
            inputField.dispatchEvent(new Event('change', { bubbles: true }));

            // 플래그가 true일 경우에만 확인 버튼 클릭 수행
            if (shouldSubmit)
            {
                // 약간의 딜레이를 주어 입력 이벤트가 완전히 반영된 후 버튼을 클릭하도록 함
                setTimeout(() =>
                {
                    const submitButton = document.querySelector('button[data-submit="true"]');
                    
                    if (submitButton)
                    {
                        submitButton.click();
                    }
                }, 100);
            }
            
            return;
        }

        // 지정된 타임아웃 시간이 초과되면 타이머 중지
        elapsedTime += intervalTime;
        if (elapsedTime >= timeoutLimit)
        {
            clearInterval(timer);
            console.log("타임아웃: 입력 필드를 찾지 못했습니다.");
        }
    }, intervalTime);

})();