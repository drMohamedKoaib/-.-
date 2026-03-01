function toggleServices(show) {
    const servicesPage = document.getElementById('servicesPage');
    servicesPage.style.display = show ? 'flex' : 'none';
    if(show) servicesPage.classList.add('active');
}

function openForm(serviceName) {
    document.getElementById('pService').value = serviceName;
    toggleServices(false);

    const modal = document.getElementById('bookingModal');
    const dateInput = document.getElementById('pDate');
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today); 
    dateInput.value = today;

    modal.style.display = 'flex';
    setTimeout(() => { modal.classList.add('active'); }, 10);
}

function closeModal() {
    const name = document.getElementById('pName').value.trim();
    if(name !== "" && !confirm("لديك بيانات مدخلة، هل أنت متأكد من رغبتك في الإلغاء؟")) return;

    const modal = document.getElementById('bookingModal');
    modal.classList.remove('active');
    setTimeout(() => { 
        modal.style.display = 'none';
        document.getElementById('pName').value = "";
        document.getElementById('pNotes').value = "";
    }, 300);
}

window.onclick = function(event) {
    const modal = document.getElementById('bookingModal');
    if (event.target == modal) closeModal();
}

function sendToWhatsapp() {
    const name = document.getElementById('pName').value.trim();
    const clinic = document.getElementById('pClinic').value;
    const service = document.getElementById('pService').value;
    const date = document.getElementById('pDate').value;
    const notes = document.getElementById('pNotes').value.trim();

    if (!name || !date) {
        alert("يرجى ملء الاسم والتاريخ");
        return;
    }

    const rawMsg = `*حجز موعد جديد*\n*المريض:* ${name}\n*العيادة:* ${clinic}\n*الخدمة:* ${service}\n*التاريخ:* ${date}\n*ملاحظات:* ${notes || "لا يوجد"}`;
    const encodedMsg = encodeURIComponent(rawMsg);
    window.open(`https://wa.me/218944717217?text=${encodedMsg}`, '_blank');

    document.getElementById('pName').value = "";
    closeModal();
}