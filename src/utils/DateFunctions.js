// Utility functions
export const unixToDate = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    
    // Format digits for default case
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear()).slice(-2); // Last two digits of year
    
    // Compare date parts - current date
    const currentDay = now.getDate();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    
    // Compare date parts - input date
    const inputDay = date.getDate();
    const inputMonth = date.getMonth();
    const inputYear = date.getFullYear();
    
    // Same day (today)
    if (inputDay === currentDay && inputMonth === currentMonth && inputYear === currentYear) {
        return "today";
    }
    
    // Check for yesterday
    const yesterday = new Date(now);
    yesterday.setDate(currentDay - 1);
    if (inputDay === yesterday.getDate() && inputMonth === yesterday.getMonth() && inputYear === yesterday.getFullYear()) {
        return "yesterday";
    }
    
    // Check for this week (up to 7 days ago)
    const sevenDaysAgo = new Date(now);
    sevenDaysAgo.setDate(currentDay - 7);
    if (date >= sevenDaysAgo) {
        return "thisWeek";
    }
    
    // Check for last week (up to 14 days ago)
    const fourteenDaysAgo = new Date(now);
    fourteenDaysAgo.setDate(currentDay - 14);
    if (date >= fourteenDaysAgo) {
        return "lastWeek";
    }
    
    // Check if same month
    if (inputMonth === currentMonth && inputYear === currentYear) {
        return "thisMonth";
    }
    
    // Default format for older dates: DD.MM.YY
    return `${day}.${month}.${year}`;
}
