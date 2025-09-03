import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';

function DesktopNavigation() {
  const { t } = useTranslation();

  return (
    <div className="hidden md:flex md:items-center md:gap-8">
      {/* Navigation Links */}
      <div className="flex items-center gap-6">
        <Link 
          to="/rekonstruktion" 
          data-cy="nav-reconstruction"
          className="text-brand-charcoal hover:text-brand-black font-medium transition-colors"
        >
          {t('navigation.reconstruction')}
        </Link>
        <Link 
          to="/ackord" 
          data-cy="nav-ackord"
          className="text-brand-charcoal hover:text-brand-black font-medium transition-colors"
        >
          {t('navigation.ackord')}
        </Link>
        <Link 
          to="/foretagskop" 
          data-cy="nav-foretagskop"
          className="text-brand-charcoal hover:text-brand-black font-medium transition-colors"
        >
          {t('navigation.foretagskop')}
        </Link>
        <Link 
          to="/kalkylator" 
          data-cy="nav-calculator"
          className="text-brand-charcoal hover:text-brand-black font-medium transition-colors"
        >
          {t('navigation.calculator')}
        </Link>
        <Link 
          to="/om-oss" 
          data-cy="nav-about"
          className="text-brand-charcoal hover:text-brand-black font-medium transition-colors"
        >
          {t('navigation.about')}
        </Link>
        <Link 
          to="/kontakt" 
          data-cy="nav-contact"
          className="text-brand-charcoal hover:text-brand-black font-medium transition-colors"
        >
          {t('navigation.contact')}
        </Link>
        {/* Login button - commented out for now, will use later
        <Link 
          to="/authentication" 
          data-cy="nav-authentication"
          className="bg-brand-umber text-brand-linen px-4 py-2 font-medium hover:bg-brand-black transition-colors"
        >
          {t('navigation.login')}
        </Link>
        */}
      </div>

      {/* Language Switcher */}
      <LanguageSwitcher isDesktop={true} />
    </div>
  );
}

export default DesktopNavigation;
