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

    // 2. Comment Section Handling
    const commentForm = document.getElementById('comment-form');
    const commentList = document.getElementById('comment-list');
    const commentName = document.getElementById('comment-name');
    const commentContent = document.getElementById('comment-content');

    // Load initial comments from localStorage
    let comments = JSON.parse(localStorage.getItem('br_comments') || '[]');
    
    // Function to render comments
    function renderComments() {
        if (comments.length === 0) {
            commentList.innerHTML = '<p style="text-align:center; color:#666;">첫 번째 댓글을 남겨보세요.</p>';
            return;
        }
        
        commentList.innerHTML = comments.map(c => `
            <div class="comment-item">
                <div class="author">${escapeHtml(c.name)}</div>
                <div class="date">${c.date}</div>
                <div class="content">${escapeHtml(c.content).replace(/\n/g, '<br>')}</div>
            </div>
        `).reverse().join('');
    }

    // Function to escape HTML to prevent XSS
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // Initial render
    renderComments();

    // Handle comment submission
    if (commentForm) {
        commentForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const newComment = {
                name: commentName.value,
                content: commentContent.value,
                date: new Date().toLocaleString('ko-KR')
            };
            
            comments.push(newComment);
            localStorage.setItem('br_comments', JSON.stringify(comments));
            
            commentName.value = '';
            commentContent.value = '';
            renderComments();
        });
    }
});
