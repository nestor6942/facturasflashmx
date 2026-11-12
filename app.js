/**
 * FacturaFlash MX - Interactive Logic & Live Calculator
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Dynamic Calculator
    const ticketRange = document.getElementById('ticketRange');
    const ticketCountDisplay = document.getElementById('ticketCountDisplay');
    const calcPrice = document.getElementById('calcPrice');
    const calcPricePerTicket = document.getElementById('calcPricePerTicket');
    const calcHoursSaved = document.getElementById('calcHoursSaved');
    const calcTaxSaved = document.getElementById('calcTaxSaved');
    const btnCalcWhatsapp = document.getElementById('btn-calc-whatsapp');

    const updateCalculator = () => {
        const count = parseInt(ticketRange.value, 10);
        ticketCountDisplay.textContent = `${count} ${count === 1 ? 'ticket' : 'tickets'}`;

        // Tiered pricing
        let pricePerTicket = 15;
        if (count <= 10) {
            pricePerTicket = 18;
        } else if (count <= 25) {
            pricePerTicket = 15;
        } else if (count <= 50) {
            pricePerTicket = 13;
        } else {
            pricePerTicket = 11;
        }

        const totalPrice = count * pricePerTicket;
        const hoursSaved = (count * 10 / 60).toFixed(1); // Avg 10 mins per manual ticket
        
        // Estimated tax deduction savings (assuming avg ticket of $250 MXN and ~25% combined tax impact)
        const estimatedTaxSaved = Math.round(count * 250 * 0.25);

        calcPrice.textContent = `$${totalPrice.toLocaleString('es-MX')} MXN`;
        calcPricePerTicket.textContent = `$${pricePerTicket.toFixed(2)} MXN por ticket`;
        calcHoursSaved.textContent = `~${hoursSaved} Horas`;
        calcTaxSaved.textContent = `+$${estimatedTaxSaved.toLocaleString('es-MX')} MXN`;

        // Update WhatsApp CTA URL
        const phone = "523335952229";
        const message = encodeURIComponent(`¡Hola FacturaFlash! Hice el cálculo en su web y tengo ${count} tickets para facturar (Cotización: $${totalPrice} MXN). ¿Cómo comenzamos?`);
        btnCalcWhatsapp.href = `https://wa.me/${phone}?text=${message}`;
    };

    if (ticketRange) {
        ticketRange.addEventListener('input', updateCalculator);
        updateCalculator(); // Initialize on page load
    }

    // 2. FAQ Accordion
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const accordionItem = header.parentElement;
            const content = header.nextElementSibling;
            const isActive = accordionItem.classList.contains('active');

            // Close all other accordion items
            document.querySelectorAll('.accordion-item').forEach(item => {
                item.classList.remove('active');
                item.querySelector('.accordion-content').style.maxHeight = null;
            });

            // Toggle current item
            if (!isActive) {
                accordionItem.classList.add('active');
                content.style.maxHeight = content.scrollHeight + 'px';
            }
        });
    });

    // Open first FAQ by default
    const firstFaq = document.querySelector('.accordion-item');
    if (firstFaq) {
        firstFaq.classList.add('active');
        const firstContent = firstFaq.querySelector('.accordion-content');
        if (firstContent) {
            firstContent.style.maxHeight = firstContent.scrollHeight + 'px';
        }
    }

    // 3. Smooth scrolling for internal anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId !== '#') {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    e.preventDefault();
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
});
