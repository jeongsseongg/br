document.addEventListener('DOMContentLoaded', () => {
    // 1. Appraisal Form Submission Handling
    const appraisalForm = document.getElementById('appraisal-form');
    if (appraisalForm) {
        appraisalForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = appraisalForm.querySelector('button');
            const originalText = submitBtn.textContent;
            const formData = new FormData(appraisalForm);
            const smsMessage = `[뉴욕워치 매입신청]\n이름: ${formData.get('user-name')}\n연락처: ${formData.get('user-phone')}\n모델명: ${formData.get('product-name')}\n상태: ${formData.get('condition')}`;
            
            submitBtn.disabled = true;
            submitBtn.textContent = '모바일 연결 중...';

            setTimeout(() => {
                window.location.href = `sms:01062936668?body=${encodeURIComponent(smsMessage)}`;
                alert('문의 내용이 사장님 문자로 자동 연결됩니다.\n문자 앱이 열리면 [전송] 버튼만 눌러주세요!');
                appraisalForm.reset();
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
            }, 800);
        });
    }

    // 2. Global-Sync Daily Counter Logic (Starts at 44 every day)
    const counterSpan = document.getElementById('contact-count');
    
    function getDailyCount() {
        const now = new Date();
        // Seconds passed since midnight
        const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const secondsPassed = Math.floor((now - startOfDay) / 1000);
        
        // Base 44 + 1 count every 400 seconds (approx 6.6 mins)
        // This makes the count look natural and synced across all devices
        const baseCount = 44;
        const timeIncrement = Math.floor(secondsPassed / 400); 
        
        return baseCount + timeIncrement;
    }

    if (counterSpan) {
        counterSpan.textContent = getDailyCount();
        // Update live without refresh every minute
        setInterval(() => {
            counterSpan.textContent = getDailyCount();
        }, 60000);
    }

    // 3. Image Slideshow Logic (Changes every 3 seconds)
    const slideshowImages = document.querySelectorAll('#slideshow img');
    let currentImageIndex = 0;

    if (slideshowImages.length > 0) {
        setInterval(() => {
            slideshowImages[currentImageIndex].classList.remove('active');
            currentImageIndex = (currentImageIndex + 1) % slideshowImages.length;
            slideshowImages[currentImageIndex].classList.add('active');
        }, 3000);
    }

    // 4. Static Reviews Generation
    const commentList = document.getElementById('comment-list');
    const todayDisplay = new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' });
    const mockReviews = [
        { name: "이*훈 고객님", content: "로렉스 성골 못해서 처분했는데 사장님이 정말 친절하시고 가격도 타 업체보다 훨씬 잘 쳐주셨어요! 감사합니다." },
        { name: "박*아 고객님", content: "다른데보다 확실히 많이 주시네요. 세운스퀘어 매장도 깔끔하고 전문적인 느낌이라 믿음이 갑니다. 번창하세요!" },
        { name: "김*영 고객님", content: "당일 바로 입금해주셔서 급전 필요했는데 큰 도움 됐습니다. 상담도 빠르고 처리도 깔끔해서 대만족입니다." },
        { name: "최*호 고객님", content: "전문가 포스가 느껴지시는 사장님 덕분에 제 시계 가치를 제대로 인정받은 기분입니다. 뉴욕워치 최고예요." },
        { name: "정*우 고객님", content: "지인 추천으로 왔는데 역시 소문대로네요. 여러군데 발품 팔아봤지만 여기가 매입가 제일 높습니다. 강력 추천!" },
        { name: "윤*지 고객님", content: "상담도 친절하시고 매장 방문했을 때도 기분 좋게 거래했습니다. 입금도 바로 확인해주셔서 신뢰가 가네요." },
        { name: "강*민 고객님", content: "오래된 오메가 시계라 걱정했는데 생각보다 감정가 높게 나와서 놀랐습니다. 정직한 업체 같아요." },
        { name: "임*희 고객님", content: "급하게 현금이 필요해서 방문했는데 10분 만에 감정부터 입금까지 끝났어요. 진짜 빠르네요!" },
        { name: "한*준 고객님", content: "뉴욕워치 사장님 정말 꼼꼼하시네요. 시계 상태 하나하나 설명해주시면서 가격 책정해주셔서 납득이 갔습니다." },
        { name: "조*현 고객님", content: "까르띠에 발롱블루 팔았는데 다른 곳보다 50만원은 더 받은 것 같아요. 발품 판 보람이 있습니다." },
        { name: "신*윤 고객님", content: "매장이 고급스럽고 상담도 프라이빗해서 좋았습니다. 소중한 시계 잘 보내준 것 같아 기쁘네요." },
        { name: "송*호 고객님", content: "IWC 포르투기저 매입 완료! 가격도 좋고 사장님 마인드도 훌륭하십니다. 명품시계 처분은 여기가 답이네요." },
        { name: "배*성 고객님", content: "택배 매입 이용했는데 불안하지 않게 과정마다 연락주시고 입금도 실물 확인 직후 바로 해주셨어요." },
        { name: "권*아 고객님", content: "샤넬 J12 판매했습니다. 여성 시계도 전문적으로 잘 봐주시네요. 다음에 또 이용할게요!" },
        { name: "황*태 고객님", content: "브라이틀링 시계 처분했는데 만족스럽습니다. 주차도 편하고 매장 접근성도 좋네요." },
        { name: "고*라 고객님", content: "여러 업체 문의해봤는데 뉴욕워치가 답변도 제일 빠르고 매입가도 가장 높았습니다." },
        { name: "문*빈 고객님", content: "파텍필립 상담받았는데 전문 지식이 대단하시네요. 하이엔드 워치일수록 여기서 팔아야 할 것 같습니다." },
        { name: "서*재 고객님", content: "거래 과정이 투명해서 좋았습니다. 계약서 작성도 꼼꼼히 해주시고 신뢰가 가는 곳입니다." }
    ];

    function renderReviews() {
        if (!commentList) return;
        const doubledReviews = [...mockReviews, ...mockReviews];
        commentList.innerHTML = doubledReviews.map(r => `
            <div class="comment-item">
                <div class="author">${r.name}</div>
                <div class="date">${todayDisplay}</div>
                <div class="content">${r.content}</div>
            </div>
        `).join('');
    }
    renderReviews();
});
