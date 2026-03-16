document.addEventListener('DOMContentLoaded', () => {
    // 1. Form Submission Handling
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
});
