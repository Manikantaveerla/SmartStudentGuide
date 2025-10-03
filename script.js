document.addEventListener('DOMContentLoaded', () => {
            // --- Mobile Menu ---
            const menuBtn = document.getElementById('menu-btn');
            const mobileMenu = document.getElementById('mobile-menu');
            menuBtn.addEventListener('click', () => {
                mobileMenu.classList.toggle('hidden');
            });

            // --- FAQ Accordion ---
            const faqToggles = document.querySelectorAll('.faq-toggle');
            faqToggles.forEach(toggle => {
                toggle.addEventListener('click', () => {
                    const content = toggle.nextElementSibling;
                    const icon = toggle.querySelector('i');

                    if (content.style.maxHeight) {
                        content.style.maxHeight = null;
                        icon.classList.remove('rotate-180');
                    } else {
                        // Close other open FAQs
                        document.querySelectorAll('.faq-content').forEach(item => {
                            item.style.maxHeight = null;
                            item.previousElementSibling.querySelector('i').classList.remove('rotate-180');
                        });
                        content.style.maxHeight = content.scrollHeight + "px";
                        icon.classList.add('rotate-180');
                    }
                });
            });
            
            // --- Initial Data ---
            let allTestimonials = [
                 { name: "Ananya K.", course: "Computer Science Student", feedback: "The resume they created for me was fantastic! It was professional, well-structured, and highlighted my skills perfectly. I got three interview calls within a week!" },
                { name: "Vikram P.", course: "Engineering Graduate", feedback: "I was stuck with my final year project. They not only completed the coding part but also provided excellent documentation. Highly recommended for project work." },
                { name: "Priya S.", course: "Arts Student", feedback: "Fast and efficient PDF editing. They edited my research paper exactly as I wanted within a few hours. Thank you so much!" },
                { name: "Sneha M.", course: "MBA Student", feedback: "The PPT they designed for my marketing presentation was top-notch. It was creative, professional, and delivered well before the deadline. Saved me a lot of time!" },
                { name: "Rahul J.", course: "B.Tech Fresher", feedback: "Their internship prep service is a must for any final year student. The mock interview was incredibly helpful and gave me the confidence I needed to crack my first interview." },
                { name: "Aisha I.", course: "Design Student", feedback: "I needed a logo for my portfolio website and they delivered a design that was better than I imagined. Very creative and they listened to all my feedback." }
            ];

            const testimonialsGrid = document.getElementById('testimonials-grid');
            const viewMoreReviewsBtn = document.getElementById('view-more-reviews-btn');


            function getInitials(name) {
                return name.split(' ').map(n => n[0]).join('').toUpperCase();
            }

            function createTestimonialCard(testimonial, index) {
                const card = document.createElement('div');
                card.className = 'bg-slate-50 p-6 sm:p-8 rounded-xl shadow-lg';
                const initials = getInitials(testimonial.name);

                let proofHtml = '';
                if (testimonial.proof) {
                    card.dataset.proofSrc = testimonial.proof;
                    proofHtml = `
                        <div class="mt-4">
                            <button class="view-proof-btn text-sm text-indigo-600 font-semibold hover:underline">
                                <i class="fas fa-receipt mr-1"></i> View Payment Proof
                            </button>
                        </div>
                    `;
                }

                card.innerHTML = `
                    <div class="flex items-center mb-4">
                        <img src="https://placehold.co/48x48/E2E8F0/4A5568?text=${initials}" alt="User" class="w-12 h-12 rounded-full mr-4">
                        <div>
                            <h4 class="font-bold text-slate-800">${testimonial.name}</h4>
                            <p class="text-sm text-slate-500">${testimonial.course}</p>
                        </div>
                    </div>
                    <p class="text-slate-600 italic">"${testimonial.feedback}"</p>
                    ${proofHtml}
                `;

                if (index >= 3) {
                    card.classList.add('hidden');
                }
                return card;
            }

            function renderTestimonials() {
                testimonialsGrid.innerHTML = '';
                allTestimonials.forEach((testimonial, index) => {
                    testimonialsGrid.appendChild(createTestimonialCard(testimonial, index));
                });
                if (allTestimonials.length > 3) {
                    viewMoreReviewsBtn.classList.remove('hidden');
                } else {
                    viewMoreReviewsBtn.classList.add('hidden');
                }
            }

            renderTestimonials();

            if (viewMoreReviewsBtn) {
                viewMoreReviewsBtn.addEventListener('click', () => {
                    testimonialsGrid.querySelectorAll('.hidden').forEach(card => {
                        card.classList.remove('hidden');
                    });
                    viewMoreReviewsBtn.classList.add('hidden');
                });
            }

            // --- Modal Logic ---
            const orderBtns = document.querySelectorAll('.order-btn');
            const paymentModal = document.getElementById('payment-modal');
            const successModal = document.getElementById('success-modal');
            const failedModal = document.getElementById('failed-modal');
            const sampleModal = document.getElementById('sample-modal');
            const cancelBtn = document.getElementById('cancel-btn');
            const payBtn = document.getElementById('pay-btn');
            const closeSuccessBtn = document.getElementById('close-success-btn');
            const tryAgainBtn = document.getElementById('try-again-btn');
            const closeSampleBtn = document.getElementById('close-sample-btn');
            const copyBtn = document.getElementById('copy-btn');
            const whatsappNumberEl = document.getElementById('whatsapp-number');
            const copyFeedback = document.getElementById('copy-feedback');
            const screenshotUpload = document.getElementById('screenshot-upload');
            const fileNameDisplay = document.getElementById('file-name');

            // --- Review Form Logic ---
            const leaveReviewBtn = document.getElementById('leave-review-btn');
            const reviewFormContainer = document.getElementById('review-form-container');
            const reviewForm = document.getElementById('review-form');
            const reviewSuccessMessage = document.getElementById('review-success-message');
            const reviewFailedMessage = document.getElementById('review-failed-message');
            const submitReviewBtn = document.getElementById('submit-review-btn');
            const reviewScreenshotUpload = document.getElementById('review-screenshot-upload');
            const reviewFileNameDisplay = document.getElementById('review-file-name');

            if (leaveReviewBtn) {
                leaveReviewBtn.addEventListener('click', () => {
                    reviewFormContainer.classList.toggle('hidden');
                });
            }

            if(reviewForm) {
                submitReviewBtn.disabled = true;
                submitReviewBtn.classList.add('opacity-50', 'cursor-not-allowed');

                reviewScreenshotUpload.addEventListener('change', () => {
                    if (reviewScreenshotUpload.files.length > 0) {
                        submitReviewBtn.disabled = false;
                        submitReviewBtn.classList.remove('opacity-50', 'cursor-not-allowed');
                        reviewFileNameDisplay.textContent = reviewScreenshotUpload.files[0].name;
                        reviewFileNameDisplay.classList.add('text-green-600', 'font-medium');

                    } else {
                        submitReviewBtn.disabled = true;
                        submitReviewBtn.classList.add('opacity-50', 'cursor-not-allowed');
                        reviewFileNameDisplay.textContent = 'No file selected...';
                        reviewFileNameDisplay.classList.remove('text-green-600', 'font-medium');
                    }
                });


                reviewForm.addEventListener('submit', (e) => {
                    e.preventDefault();
                    const btnText = submitReviewBtn.querySelector('.btn-text');
                    const btnSpinner = submitReviewBtn.querySelector('.btn-spinner');
                    
                    btnText.classList.add('hidden');
                    btnSpinner.classList.remove('hidden');
                    submitReviewBtn.disabled = true;
                    reviewSuccessMessage.classList.add('hidden');
                    reviewFailedMessage.classList.add('hidden');

                    setTimeout(() => {
                        const uploadedFile = reviewScreenshotUpload.files[0];
                        const fileName = uploadedFile ? uploadedFile.name.toLowerCase() : '';
                        const upiKeywords = ['screenshot', 'phonepe', 'gpay', 'paytm', 'upi', 'bhim'];
                        const isUpiScreenshot = upiKeywords.some(keyword => fileName.includes(keyword));
                        const isSuccess = isUpiScreenshot;

                        btnText.classList.remove('hidden');
                        btnSpinner.classList.add('hidden');
                        
                        if (isSuccess) {
                            const reader = new FileReader();
                            reader.onload = function(e) {
                                const newReview = {
                                    name: document.getElementById('reviewer-name').value,
                                    course: document.getElementById('reviewer-course').value,
                                    feedback: document.getElementById('reviewer-feedback').value,
                                    proof: e.target.result
                                };
                                allTestimonials.unshift(newReview);
                                renderTestimonials(); // Re-render all testimonials
                                
                                reviewForm.reset();
                                reviewFileNameDisplay.textContent = 'No file selected...';
                                reviewFileNameDisplay.classList.remove('text-green-600', 'font-medium');
                                reviewSuccessMessage.classList.remove('hidden');
                                 setTimeout(() => {
                                    reviewSuccessMessage.classList.add('hidden');
                                    reviewFormContainer.classList.add('hidden');
                                }, 4000);
                            };
                            reader.readAsDataURL(uploadedFile);
                        } else {
                            reviewFailedMessage.classList.remove('hidden');
                            submitReviewBtn.disabled = false;
                        }

                    }, 2000);
                });
            }

          // --- Sample Modal Logic ---
            const sampleCards = document.querySelectorAll('.sample-card');
            const sampleModalTitle = document.getElementById('sample-modal-title');
            const sampleModalImage = document.getElementById('sample-modal-image');
            const sampleModalVideo = document.getElementById('sample-modal-video');
            const galleryPrevBtn = document.getElementById('gallery-prev');
            const galleryNextBtn = document.getElementById('gallery-next');

            const galleries = {
                resume: {
                    type: 'image',
                    sources: [
                        '/images/r1.jpg',
                        '/images/r2.jpg',
                        '/images/r3.jpg',
                        '/images/r4.jpg',
                        '/images/r5.jpg',
                        '/images/prbc.png'
                    ]
                },
                portfolio: {
                    type: 'video',
                    sources: [
                        '/images/pp1.mp4',
                        '/images/pp2.mp4',
                        '/images/pp3.mp4',
                        '/images/pp4.mp4',
                        '/images/pp5.mp4',
                        '/images/ppvd.mp4'
                    ]
                },
                ppt: {
                    type: 'video',
                    sources: [
                        '/images/PPT1.mp4',
                        '/images/PPT2.mp4',
                        '/images/PPT3.mp4' 
                    ]
                },
                doc: {
                    type: 'image',
                    sources: [
                        'https://placehold.co/1200x800/166534/ffffff?text=User+Manual:+Installation+Guide',
                        'https://placehold.co/1200x800/166534/ffffff?text=API+Reference:+/users+Endpoint',
                        'https://placehold.co/1200x800/166534/ffffff?text=Technical+Report+with+Diagrams',
                        'https://placehold.co/1200x800/166534/ffffff?text=Code+Documentation+Snippet',
                        'https://placehold.co/1200x800/166534/ffffff?text=Project+Proposal+Layout'
                    ]
                },
                logo: {
                    type: 'image',
                    sources: [
                        'https://placehold.co/1200x800/0d9488/ffffff?text=Minimalist+Icon+Logo',
                        'https://placehold.co/1200x800/0d9488/ffffff?text=Modern+Wordmark+Logo',
                        'https://placehold.co/1200x800/0d9488/ffffff?text=Classic+Emblem+Design',
                        'https://placehold.co/1200x800/0d9488/ffffff?text=Abstract+Geometric+Logo',
                        'https://placehold.co/1200x800/0d9488/ffffff?text=Colorful+Gradient+Logo'
                    ]
                },
                project: {
                    type: 'image',
                    sources: [
                        'https://placehold.co/1200x800/be185d/ffffff?text=E-commerce+Product+Page+UI',
                        'https://placehold.co/1200x800/be185d/ffffff?text=SaaS+Dashboard+Analytics',
                        'https://placehold.co/1200x800/be185d/ffffff?text=Mobile+App+Login+Screen',
                        'https://placehold.co/1200x800/be185d/ffffff?text=Blog+Homepage+Layout',
                        'https://placehold.co/1200x800/be185d/ffffff?text=Social+Media+Feed+Design'
                    ]
                }
            };

            let currentGalleryContent = [];
            let currentIndex = 0;
            let currentContentType = 'image';

            function updateGalleryContent() {
                const itemSrc = currentGalleryContent[currentIndex];
                if (currentContentType === 'video') {
                    sampleModalImage.classList.add('hidden');
                    sampleModalVideo.classList.remove('hidden');
                    sampleModalVideo.src = itemSrc;
                } else {
                    sampleModalVideo.classList.add('hidden');
                    sampleModalImage.classList.remove('hidden');
                    sampleModalImage.src = itemSrc;
                }
            }

            sampleCards.forEach(card => {
                card.addEventListener('click', () => {
                    const title = card.querySelector('h3').innerText;
                    sampleModalTitle.innerText = title;
                    const galleryKey = card.dataset.gallery;
                    
                    if (galleries[galleryKey]) {
                        currentGalleryContent = galleries[galleryKey].sources;
                        currentContentType = galleries[galleryKey].type;
                        currentIndex = 0;
                        updateGalleryContent();
                        galleryPrevBtn.classList.remove('hidden');
                        galleryNextBtn.classList.remove('hidden');
                    } else {
                        // Fallback for cards without a dedicated gallery
                        const img = card.querySelector('img');
                        sampleModalImage.src = img.src;
                        currentContentType = 'image';
                        sampleModalVideo.classList.add('hidden');
                        sampleModalImage.classList.remove('hidden');
                        galleryPrevBtn.classList.add('hidden');
                        galleryNextBtn.classList.add('hidden');
                    }
                    
                    openModal(sampleModal);
                });
            });
            
            closeSampleBtn.addEventListener('click', () => {
                sampleModalVideo.pause();
                closeModal(sampleModal);
            });

            galleryNextBtn.addEventListener('click', () => {
                currentIndex = (currentIndex + 1) % currentGalleryContent.length;
                updateGalleryContent();
            });

            galleryPrevBtn.addEventListener('click', () => {
                currentIndex = (currentIndex - 1 + currentGalleryContent.length) % currentGalleryContent.length;
                updateGalleryContent();
            });

            testimonialsGrid.addEventListener('click', (e) => {
                const proofBtn = e.target.closest('.view-proof-btn');
                if (proofBtn) {
                    const card = proofBtn.closest('.bg-slate-50');
                    const proofSrc = card.dataset.proofSrc;
                    sampleModalTitle.innerText = "Payment Proof";
                    sampleModalImage.src = proofSrc;
                    sampleModalImage.classList.remove('hidden');
                    sampleModalVideo.classList.add('hidden');
                    galleryPrevBtn.classList.add('hidden');
                    galleryNextBtn.classList.add('hidden');
                    openModal(sampleModal);
                }
            });


            // --- Payment Tabs ---
            const upiTab = document.getElementById('upi-tab');
            const bankTab = document.getElementById('bank-tab');
            const upiDetails = document.getElementById('upi-details');
            const bankDetails = document.getElementById('bank-details');
            const paymentTabs = document.querySelectorAll('.payment-tab');

            // --- Screenshot Upload & Pay Button Logic ---
            payBtn.disabled = true;
            payBtn.classList.add('opacity-50', 'cursor-not-allowed');
            
            screenshotUpload.addEventListener('change', () => {
                if (screenshotUpload.files.length > 0) {
                    payBtn.disabled = false;
                    payBtn.classList.remove('opacity-50', 'cursor-not-allowed');
                    fileNameDisplay.textContent = screenshotUpload.files[0].name;
                    fileNameDisplay.classList.remove('text-slate-500');
                    fileNameDisplay.classList.add('text-green-600', 'font-medium');
                } else {
                    payBtn.disabled = true;
                    payBtn.classList.add('opacity-50', 'cursor-not-allowed');
                    fileNameDisplay.textContent = 'PNG, JPG, JPEG';
                    fileNameDisplay.classList.add('text-slate-500');
                    fileNameDisplay.classList.remove('text-green-600', 'font-medium');
                }
            });


            upiTab.addEventListener('click', () => {
                bankDetails.classList.add('hidden');
                upiDetails.classList.remove('hidden');
                paymentTabs.forEach(tab => tab.classList.remove('active-tab', 'text-slate-500'));
                upiTab.classList.add('active-tab');
                bankTab.classList.add('text-slate-500');
            });

            bankTab.addEventListener('click', () => {
                upiDetails.classList.add('hidden');
                bankDetails.classList.remove('hidden');
                paymentTabs.forEach(tab => tab.classList.remove('active-tab', 'text-slate-500'));
                bankTab.classList.add('active-tab');
                upiTab.classList.add('text-slate-500');
            });


            const openModal = (modal) => {
                modal.classList.remove('hidden');
                setTimeout(() => {
                    modal.querySelector('div').classList.remove('scale-95', 'opacity-0');
                }, 10);
            };

            const closeModal = (modal) => {
                modal.querySelector('div').classList.add('scale-95', 'opacity-0');
                setTimeout(() => {
                    modal.classList.add('hidden');
                }, 300);
            };

            orderBtns.forEach(btn => btn.addEventListener('click', () => openModal(paymentModal)));
            cancelBtn.addEventListener('click', () => closeModal(paymentModal));
            closeSuccessBtn.addEventListener('click', () => closeModal(successModal));
            tryAgainBtn.addEventListener('click', () => {
                closeModal(failedModal);
                setTimeout(() => openModal(paymentModal), 350);
            });


            payBtn.addEventListener('click', () => {
                const btnText = payBtn.querySelector('.btn-text');
                const btnSpinner = payBtn.querySelector('.btn-spinner');

                // Show spinner and disable button
                btnText.classList.add('hidden');
                btnSpinner.classList.remove('hidden');
                payBtn.disabled = true;

                // Simulate a 3-second verification process
                setTimeout(() => {
                    // --- SIMULATED REAL-TIME CHECK ---
                    // Get the uploaded file name
                    const uploadedFile = screenshotUpload.files[0];
                    const fileName = uploadedFile ? uploadedFile.name.toLowerCase() : '';

                    // Keywords to check for in the filename to simulate a valid UPI screenshot
                    const upiKeywords = ['screenshot', 'phonepe', 'gpay', 'paytm', 'upi', 'bhim'];

                    // Check if the filename looks like a real UPI screenshot
                    const isUpiScreenshot = upiKeywords.some(keyword => fileName.includes(keyword));
                    
                    // Simulate success or failure based on the filename check
                    // 95% success rate for valid-looking filenames, 10% for others.
                    const isSuccess = isUpiScreenshot ? (Math.random() < 0.95) : (Math.random() < 0.1);

                    closeModal(paymentModal);

                    // Reset button state
                    btnText.classList.remove('hidden');
                    btnSpinner.classList.add('hidden');
                    
                     // Reset the form for next time
                    screenshotUpload.value = '';
                    payBtn.disabled = true;
                    payBtn.classList.add('opacity-50', 'cursor-not-allowed');
                    fileNameDisplay.textContent = 'PNG, JPG, JPEG';
                    fileNameDisplay.classList.add('text-slate-500');
                    fileNameDisplay.classList.remove('text-green-600', 'font-medium');


                    setTimeout(() => {
                        if (isSuccess) {
                            openModal(successModal);
                        } else {
                            openModal(failedModal);
                        }
                    }, 350);

                }, 3000);
            });
            
            // --- Copy to Clipboard ---
            copyBtn.addEventListener('click', () => {
                const numberToCopy = whatsappNumberEl.innerText;
                const tempInput = document.createElement('input');
                document.body.appendChild(tempInput);
                tempInput.value = numberToCopy.replace(/\s/g, '');
                tempInput.select();
                document.execCommand('copy');
                document.body.removeChild(tempInput);

                copyFeedback.classList.remove('opacity-0');
                setTimeout(() => {
                    copyFeedback.classList.add('opacity-0');
                }, 2000);
            });
        });