document.addEventListener('DOMContentLoaded', () => {
    // 1. Live Ticker Data
    const tickerContent = document.getElementById('live-ticker');
    const tickerItems = [
        "샤넬 클래식 플랩백 - 980만원 매입 완료 (12분 전)",
        "롤렉스 서브마리너 - 1,450만원 매입 완료 (25분 전)",
        "헤르메스 버킨 30 - 2,100만원 매입 완료 (48분 전)",
        "오데마 피게 로열오크 - 4,200만원 매입 완료 (1시간 전)",
        "까르띠에 탱크 솔로 - 350만원 매입 완료 (1시간 10분 전)",
        "루이비통 카퓌신 - 520만원 매입 완료 (2시간 전)"
    ];

    // Double the items for seamless loop if needed, 
    // but the CSS animation handles it generally.
    // For now, let's just populate it.
    tickerContent.innerHTML = '';
    tickerItems.forEach(item => {
        const span = document.createElement('span');
        span.className = 'ticker-item';
        span.textContent = item;
        tickerContent.appendChild(span);
    });
    // Clone for infinite scroll effect
    tickerItems.forEach(item => {
        const span = document.createElement('span');
        span.className = 'ticker-item';
        span.textContent = item;
        tickerContent.appendChild(span);
    });

    // 2. Form Submission Handling
    const appraisalForm = document.getElementById('appraisal-form');
    if (appraisalForm) {
        appraisalForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const submitBtn = appraisalForm.querySelector('button');
            const originalText = submitBtn.textContent;
            
            // Simulate loading
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

    // 3. Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 70;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 4. Header Scroll Effect
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
        } else {
            header.style.boxShadow = 'none';
        }
    });
});
