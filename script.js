const passwordInput = document.getElementById('password');
const result = document.getElementById('result');
const feedback = document.getElementById('feedback');
const strengthFill = document.getElementById('strengthFill');
const checkBtn = document.getElementById('checkBtn');
const toggleVis = document.getElementById('toggleVis');

function evaluate(password){
    const checks = [
        {ok: password.length >= 8, msg: 'At least 8 characters'},
        {ok: /[A-Z]/.test(password), msg: 'One uppercase letter'},
        {ok: /[a-z]/.test(password), msg: 'One lowercase letter'},
        {ok: /[0-9]/.test(password), msg: 'One number'},
        {ok: /[@$!%*?&^#()_+\-=[\]{};':"\\|,.<>/?]/.test(password), msg: 'One special character'}
    ];
    return checks;
}

function updateUI(password){
    feedback.innerHTML = '';
    const checks = evaluate(password);
    const passed = checks.filter(c => c.ok).length;
    const percent = Math.min(100, Math.round((passed / checks.length) * 100));
    strengthFill.style.width = percent + '%';

    let color = 'linear-gradient(90deg,#34d399,#60a5fa)';
    let text = 'Weak';
    if(percent >= 80){ color = 'linear-gradient(90deg,#16a34a,#06b6d4)'; text = 'Strong'; }
    else if(percent >= 50){ color = 'linear-gradient(90deg,#f59e0b,#60a5fa)'; text = 'Medium'; }
    strengthFill.style.background = color;
    result.textContent = percent === 100 ? '✅ Strong password' : percent === 0 ? '' : text;

    checks.filter(c => !c.ok).forEach(c =>{
        const li = document.createElement('li');
        li.textContent = c.msg;
        feedback.appendChild(li);
    });
}

passwordInput.addEventListener('input', (e) => {
    updateUI(e.target.value);
});

checkBtn.addEventListener('click', () => {
    const pwd = passwordInput.value;
    updateUI(pwd);
    const checks = evaluate(pwd);
    const passed = checks.filter(c => c.ok).length;
    const percent = Math.min(100, Math.round((passed / checks.length) * 100));
    if (percent >= 80) {
        result.textContent = 'Your password is strong';
    } else {
        result.textContent = 'Your password is weak';
    }
});

// Toggle password visibility
if (toggleVis) {
    toggleVis.addEventListener('click', () => {
        const isHidden = passwordInput.type === 'password';
        passwordInput.type = isHidden ? 'text' : 'password';
        toggleVis.textContent = isHidden ? 'Hide' : 'Show';
        toggleVis.setAttribute('aria-pressed', String(isHidden));
        // bring focus back to input
        passwordInput.focus();
    });
}

// Initialize
updateUI('');
