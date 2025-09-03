import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';

function MobileNavigation({ isOpen, onClose }) {
  const { t } = useTranslation();

  if (!isOpen) return null;

  return (
    <div className="md:hidden mt-4 py-4 border-t border-brand-khaki" data-cy="mobile-menu">
      <div className="flex flex-col gap-4">
        <Link 
          to="/rekonstruktion" 
          data-cy="mobile-nav-reconstruction"
          className="text-brand-charcoal hover:text-brand-black font-medium transition-colors"
          onClick={onClose}
        >
          {t('navigation.reconstruction')}
        </Link>
        <Link 
          to="/ackord" 
          data-cy="mobile-nav-ackord"
          className="text-brand-charcoal hover:text-brand-black font-medium transition-colors"
          onClick={onClose}
        >
          {t('navigation.ackord')}
        </Link>
        <Link 
          to="/foretagskop" 
          data-cy="mobile-nav-foretagskop"
          className="text-brand-charcoal hover:text-brand-black font-medium transition-colors"
          onClick={onClose}
        >
          {t('navigation.foretagskop')}
        </Link>
        <Link 
          to="/kalkylator" 
          data-cy="mobile-nav-calculator"
          className="text-brand-charcoal hover:text-brand-black font-medium transition-colors"
          onClick={onClose}
        >
          {t('navigation.calculator')}
        </Link>
        <Link 
          to="/om-oss" 
          data-cy="mobile-nav-about"
          className="text-brand-charcoal hover:text-brand-black font-medium transition-colors"
          onClick={onClose}
        >
          {t('navigation.about')}
        </Link>
        <Link 
          to="/kontakt" 
          data-cy="mobile-nav-contact"
          className="text-brand-charcoal hover:text-brand-black font-medium transition-colors"
          onClick={onClose}
        >
          {t('navigation.contact')}
        </Link>
        {/* Mobile login button - commented out for now, will use later
        <Link 
          to="/authentication" 
          data-cy="mobile-nav-authentication"
          className="bg-brand-umber text-brand-linen px-4 py-2 font-medium hover:bg-brand-black transition-colors text-center"
          onClick={onClose}
        >
          {t('navigation.login')}
        </Link>
        */}
        
        {/* Mobile Language Switcher */}
        <LanguageSwitcher isDesktop={false} onLanguageChange={onClose} />
      </div>
    </div>
  );
}

export default MobileNavigation;
