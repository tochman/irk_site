import { useTranslation } from 'react-i18next';
import PhoneNumber from './PhoneNumber';

function ConfirmationMessage({ onClose, userName, appointmentDate, appointmentTime }) {
  const { t, i18n } = useTranslation();

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString(i18n.language === 'sv' ? 'sv-SE' : 'en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Generate calendar links
  const generateCalendarLinks = () => {
    if (!appointmentDate || !appointmentTime) return null;

    const [hours, minutes] = appointmentTime.split(':');
    const startDate = new Date(appointmentDate);
    startDate.setHours(parseInt(hours), parseInt(minutes), 0);
    
    const endDate = new Date(startDate);
    endDate.setMinutes(endDate.getMinutes() + 45); // 45 minute consultation

    const title = t('confirmation.calendar_title', 'Konsultation med Reconstructor');
    const description = t('confirmation.calendar_description', 
      'Konfidentiell konsultation angående företagsrekonstruktion. Vi kommer att kontakta dig på det telefonnummer du angav.');
    const location = t('confirmation.calendar_location', 'Telefonsamtal');

    // Format dates for calendar APIs
    const formatDateForCalendar = (date) => {
      return date.toISOString().replace(/-|:|\.\d+/g, '');
    };

    // Google Calendar URL
    const googleUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${formatDateForCalendar(startDate)}/${formatDateForCalendar(endDate)}&details=${encodeURIComponent(description)}&location=${encodeURIComponent(location)}`;

    // Microsoft Outlook/Office 365 URL
    const outlookUrl = `https://outlook.office.com/calendar/0/deeplink/compose?subject=${encodeURIComponent(title)}&startdt=${startDate.toISOString()}&enddt=${endDate.toISOString()}&body=${encodeURIComponent(description)}&location=${encodeURIComponent(location)}`;

    // iCal format (for Apple Calendar and others)
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
DTSTART:${formatDateForCalendar(startDate)}
DTEND:${formatDateForCalendar(endDate)}
SUMMARY:${title}
DESCRIPTION:${description}
LOCATION:${location}
END:VEVENT
END:VCALENDAR`;

    const icsUrl = `data:text/calendar;charset=utf-8,${encodeURIComponent(icsContent)}`;

    return { googleUrl, outlookUrl, icsUrl };
  };

  const calendarLinks = generateCalendarLinks();

  return (
    <div className="text-center max-w-md mx-auto">
      <div className="mb-6">
        <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        
        <h3 className="text-2xl font-bold mb-4">
          {t('confirmation.title')}
          {userName && ` ${userName}!`}
        </h3>
        
        <p className="text-lg mb-4">
          {t('confirmation.message')}
        </p>

        {appointmentDate && appointmentTime && (
          <div className="bg-brand-umber bg-opacity-10 p-4 rounded-sm mb-4">
            <p className="font-semibold text-brand-charcoal mb-2">
              {t('confirmation.appointment_scheduled', 'Din konsultation är schemalagd:')}
            </p>
            <p className="text-lg font-bold text-brand-umber">
              {formatDate(appointmentDate)}
            </p>
            <p className="text-xl font-bold text-brand-umber mt-1">
              {t('confirmation.at_time', 'Kl.')} {appointmentTime}
            </p>
            <p className="text-sm text-brand-charcoal mt-2 opacity-80">
              {t('confirmation.duration_note', '(45 minuter)')}
            </p>

            {calendarLinks && (
              <div className="mt-4 pt-4 border-t border-brand-khaki">
                <p className="text-sm font-medium text-brand-charcoal mb-3">
                  {t('confirmation.add_to_calendar', 'Lägg till i kalender:')}
                </p>
                <div className="flex flex-col gap-2">
                  <a
                    href={calendarLinks.googleUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-white border-2 border-brand-khaki text-brand-charcoal hover:bg-brand-khaki hover:text-brand-umber transition-colors rounded text-sm font-medium"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2z"/>
                    </svg>
                    Google Calendar
                  </a>
                  <a
                    href={calendarLinks.outlookUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-white border-2 border-brand-khaki text-brand-charcoal hover:bg-brand-khaki hover:text-brand-umber transition-colors rounded text-sm font-medium"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2z"/>
                    </svg>
                    Outlook Calendar
                  </a>
                  <a
                    href={calendarLinks.icsUrl}
                    download="consultation.ics"
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-white border-2 border-brand-khaki text-brand-charcoal hover:bg-brand-khaki hover:text-brand-umber transition-colors rounded text-sm font-medium"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2z"/>
                    </svg>
                    {t('confirmation.download_ics', 'Ladda ner (.ics)')}
                  </a>
                </div>
              </div>
            )}
          </div>
        )}
        
        <p className="mb-6 opacity-90">
          {t('confirmation.next_steps')}
        </p>
        
        <div className="bg-brand-linen bg-opacity-20 p-4 rounded mb-6">
          <p className="text-sm opacity-90">
            {t('confirmation.confidential')}
          </p>
        </div>
      </div>

      <button
        onClick={onClose}
        className="bg-brand-linen text-brand-umber px-6 py-3 font-medium hover:bg-brand-khaki hover:bg-opacity-90 transition-colors duration-300"
      >
        {t('confirmation.close')}
      </button>
      
      <div className="mt-4 text-sm opacity-80">
        <p>{t('confirmation.urgent')} <strong><PhoneNumber number="+46 722 441585" /></strong></p>
      </div>
    </div>
  );
}

export default ConfirmationMessage;
