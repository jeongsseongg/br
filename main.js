document.addEventListener('DOMContentLoaded', () => {
    // 1. Appraisal Form Submission Handling
    const appraisalForm = document.getElementById('appraisal-form');
    if (appraisalForm) {
        appraisalForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const submitBtn = appraisalForm.querySelector('button');
            const originalText = submitBtn.textContent;
            
            submitBtn.disabled = true;
            submitBtn.textContent = '견적 산출 중...';
            
            setTimeout(() => {
                alert('감정 신청이 접수되었습니다!\n30분 이내로 전문 상담원이 연락드리겠습니다.');
                appraisalForm.reset();
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
            }, 1500);
        });
    }

    // 2. Static Reviews Generation (doubled for seamless vertical scroll)
    const commentList = document.getElementById('comment-list');
    const today = new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' });

    const mockReviews = [
        { name: "이*훈 고객님", content: "로렉스 성골 못해서 처분했는데 사장님이 정말 친절하시고 가격도 타 업체보다 훨씬 잘 쳐주셨어요! 감사합니다." },
        { name: "박*아 고객님", content: "다른데보다 확실히 많이 주시네요. 세운스퀘어 매장도 깔끔하고 전문적인 느낌이라 믿음이 갑니다. 번창하세요!" },
        { name: "김*영 고객님", content: "당일 바로 입금해주셔서 급전 필요했는데 큰 도움 됐습니다. 상담도 빠르고 처리도 깔끔해서 대만족입니다." },
        { name: "최*호 고객님", content: "전문가 포스가 느껴지시는 사장님 덕분에 제 시계 가치를 제대로 인정받은 기분입니다. 뉴욕워치 최고예요." },
        { name: "정*우 고객님", content: "지인 추천으로 왔는데 역시 소문대로네요. 여러군데 발품 팔아봤지만 여기가 매입가 제일 높습니다. 강력 추천!" },
        { name: "윤*지 고객님", content: "상담도 친절하시고 매장 방문했을 때도 기분 좋게 거래했습니다. 입금도 바로 확인해주셔서 신뢰가 가네요." }
    ];

    function renderReviews() {
        if (!commentList) return;
        
        // Double the content for continuous scrolling effect
        const doubledReviews = [...mockReviews, ...mockReviews];
        
        commentList.innerHTML = doubledReviews.map(r => `
            <div class="comment-item">
                <div class="author">${r.name}</div>
                <div class="date">${today}</div>
                <div class="content">${r.content}</div>
            </div>
        `).join('');
    }

    renderReviews();
});
