import React from 'react'

const dateAndTime = {
    formatDate: (inputString) => {
        // Create a new Date object from the input string
        const date = new Date(inputString);
    
        // Extract the date components
        const day = date.getDate();
        const month = date.getMonth() + 1; // Months are zero-based, so we add 1
        const year = date.getFullYear();
        const hours = date.getHours();
        const minutes = date.getMinutes();
    
        // Add leading zeros if necessary
        const formattedDay = String(day).padStart(2, '0');
        const formattedMonth = String(month).padStart(2, '0');
        const formattedHours = String(hours).padStart(2, '0');
        const formattedMinutes = String(minutes).padStart(2, '0');
    
        // Construct the formatted date string
        const formattedDate = `${formattedDay}-${formattedMonth}-${year} ${formattedHours}:${formattedMinutes}`;
    
        return formattedDate;
    },
    
    
};

export default dateAndTime
