import React from 'react';
import { useTranslation } from 'react-i18next';

function Integrity() {
  const { t } = useTranslation();

  return (
    <div className="bg-brand-linen min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-sm shadow-md">
          <h1 className="text-3xl md:text-4xl font-heading text-brand-umber mb-6">{t('privacyPolicy.title')}</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="lead">{t('privacyPolicy.introduction')}</p>
            
            <h2 className="text-2xl text-brand-charcoal">{t('privacyPolicy.dataCollection.title')}</h2>
            <p>{t('privacyPolicy.dataCollection.description')}</p>
            
            <h3 className="text-xl text-brand-charcoal">{t('privacyPolicy.dataCollection.personalData')}</h3>
            <ul>
              <li>{t('privacyPolicy.dataCollection.nameEmail')}</li>
              <li>{t('privacyPolicy.dataCollection.contactInfo')}</li>
              <li>{t('privacyPolicy.dataCollection.bankId')}</li>
              <li>{t('privacyPolicy.dataCollection.usage')}</li>
            </ul>
            
            <h2 className="text-2xl text-brand-charcoal mt-8">{t('privacyPolicy.dataPurpose.title')}</h2>
            <p>{t('privacyPolicy.dataPurpose.description')}</p>
            <ul>
              <li>{t('privacyPolicy.dataPurpose.services')}</li>
              <li>{t('privacyPolicy.dataPurpose.improvement')}</li>
              <li>{t('privacyPolicy.dataPurpose.communication')}</li>
              <li>{t('privacyPolicy.dataPurpose.legal')}</li>
            </ul>
            
            <h2 className="text-2xl text-brand-charcoal mt-8">{t('privacyPolicy.dataStorage.title')}</h2>
            <p>{t('privacyPolicy.dataStorage.description')}</p>
            
            <h2 className="text-2xl text-brand-charcoal mt-8">{t('privacyPolicy.dataSharing.title')}</h2>
            <p>{t('privacyPolicy.dataSharing.description')}</p>
            
            <h2 className="text-2xl text-brand-charcoal mt-8">{t('privacyPolicy.userRights.title')}</h2>
            <p>{t('privacyPolicy.userRights.description')}</p>
            <ul>
              <li>{t('privacyPolicy.userRights.access')}</li>
              <li>{t('privacyPolicy.userRights.correction')}</li>
              <li>{t('privacyPolicy.userRights.deletion')}</li>
              <li>{t('privacyPolicy.userRights.objection')}</li>
              <li>{t('privacyPolicy.userRights.portability')}</li>
              <li>{t('privacyPolicy.userRights.complain')}</li>
            </ul>
            
            <h2 className="text-2xl text-brand-charcoal mt-8">{t('privacyPolicy.cookies.title')}</h2>
            <p>{t('privacyPolicy.cookies.description')}</p>
            <p>
              <a 
                href="/consent" 
                className="text-brand-umber hover:underline"
              >
                {t('privacyPolicy.cookies.readMore')}
              </a>
            </p>
            
            <h2 className="text-2xl text-brand-charcoal mt-8">{t('privacyPolicy.contact.title')}</h2>
            <p>{t('privacyPolicy.contact.description')}</p>
            <address className="not-italic">
              Reconstructor<br />
              Email: info@reconstructor.se<br />
              Telefon: +46 722 441585
            </address>
            
            <div className="border-t border-gray-200 pt-4 mt-8 text-sm text-gray-600">
              <p>{t('privacyPolicy.lastUpdated')}: 2025-07-01</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Integrity;
