class Calendar {
    constructor() {
        this.currentDate = new Date();
        this.currentMonth = this.currentDate.getMonth();
        this.currentYear = this.currentDate.getFullYear();
        this.monthNames = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];

        this.init();
    }

    init() {
        this.monthDisplay = document.getElementById('monthDisplay');
        this.calendarGrid = document.getElementById('calendar');
        this.prevButton = document.getElementById('prevMonth');
        this.nextButton = document.getElementById('nextMonth');

        this.prevButton.addEventListener('click', () => this.previousMonth());
        this.nextButton.addEventListener('click', () => this.nextMonth());

        this.renderCalendar();
    }

    renderCalendar() {
        const firstDay = new Date(this.currentYear, this.currentMonth, 1);
        const lastDay = new Date(this.currentYear, this.currentMonth + 1, 0);
        const startingDay = firstDay.getDay();
        const totalDays = lastDay.getDate();

        this.monthDisplay.textContent = `${this.monthNames[this.currentMonth]} ${this.currentYear}`;
        this.calendarGrid.innerHTML = '';

        // Add empty cells for days before the first day of the month
        for (let i = 0; i < startingDay; i++) {
            this.calendarGrid.appendChild(this.createDayElement(''));
        }

        // Add days of the current month
        for (let day = 1; day <= totalDays; day++) {
            const dayElement = this.createDayElement(day);
            if (this.isToday(day)) {
                dayElement.classList.add('today');
            }
            this.calendarGrid.appendChild(dayElement);
        }

        // Add empty cells for remaining days
        const remainingDays = 42 - (startingDay + totalDays);
        for (let i = 0; i < remainingDays; i++) {
            this.calendarGrid.appendChild(this.createDayElement(''));
        }
    }

    createDayElement(day) {
        const div = document.createElement('div');
        div.textContent = day;
        
        if (day === '') {
            div.classList.add('empty');
        } else {
            div.addEventListener('click', () => this.selectDate(day));
        }
        
        return div;
    }

    isToday(day) {
        const today = new Date();
        return day === today.getDate() &&
               this.currentMonth === today.getMonth() &&
               this.currentYear === today.getFullYear();
    }

    selectDate(day) {
        console.log(`Selected date: ${this.monthNames[this.currentMonth]} ${day}, ${this.currentYear}`);
        // Add any additional functionality for date selection here
    }

    previousMonth() {
        this.currentMonth--;
        if (this.currentMonth < 0) {
            this.currentMonth = 11;
            this.currentYear--;
        }
        this.renderCalendar();
    }

    nextMonth() {
        this.currentMonth++;
        if (this.currentMonth > 11) {
            this.currentMonth = 0;
            this.currentYear++;
        }
        this.renderCalendar();
    }
}

// Initialize the calendar when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new Calendar();
}); 