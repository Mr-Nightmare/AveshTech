// contact.js - Contact form submission

async function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;
  
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span class="animate-spin inline-block mr-2">⏳</span> Sending...';
    submitBtn.disabled = true;
    
    const formData = {
      name: form.querySelector('#contact-name').value.trim(),
      email: form.querySelector('#contact-email').value.trim(),
      subject: form.querySelector('#contact-subject').value,
      message: form.querySelector('#contact-message').value.trim()
    };
    
    // Validate
    if (!formData.name || !formData.email || !formData.message) {
      showToast('Please fill in all required fields.', 'error');
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
      return;
    }
    
    // Save to local inquiries store
    if (window.AveshStore && typeof window.AveshStore.saveInquiry === 'function') {
      window.AveshStore.saveInquiry(formData);
    }

    // Persist to Supabase Cloud Database
    (async () => {
      try {
        const sb = await waitForSupabase(3500);
        if (sb && typeof sb.from === 'function') {
          const { error } = await sb.from('contact_messages').insert([formData]);
          if (error) console.warn('[Supabase Contact Error]:', error.message || error);
        }
      } catch (e) {
        console.warn('[Contact Save Warning]:', e);
      }
    })();

    // Notify Maker on Telegram if configured
    if (window.AveshNotifications && typeof window.AveshNotifications.notifyCustomQuote === 'function') {
      window.AveshNotifications.notifyCustomQuote(formData);
    }

    showToast('Message sent successfully! Our maker team will contact you shortly.', 'success');
    form.reset();
    submitBtn.innerHTML = originalText;
    submitBtn.disabled = false;
  });
}

document.addEventListener('DOMContentLoaded', initContactForm);
