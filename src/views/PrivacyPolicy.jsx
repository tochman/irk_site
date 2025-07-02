import React from 'react';
import { useTranslation } from 'react-i18next';

const PrivacyPolicy = () => {
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;
  
  return (
    <main data-cy="main-content" className="container mx-auto px-6 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">
          {currentLanguage === 'sv' ? 'Integritetspolicy' : 'سیاست حفظ حریم خصوصی'}
        </h1>

        {currentLanguage === 'sv' ? (
          <>
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Cookies och liknande tekniker</h2>
              <p className="mb-4">
                Vi använder cookies och liknande tekniker på vår webbplats för att förbättra din upplevelse, 
                analysera trafik och för marknadsföringsändamål. Cookies är små textfiler som lagras på din 
                enhet när du besöker en webbplats.
              </p>
              
              <h3 className="text-lg font-medium mb-2 mt-6">Vilka typer av cookies använder vi?</h3>
              <ul className="list-disc pl-5 mb-4 space-y-2">
                <li>
                  <strong>Nödvändiga cookies:</strong> Dessa är avgörande för att webbplatsen ska fungera 
                  och kan inte stängas av i våra system.
                </li>
                <li>
                  <strong>Funktionella cookies:</strong> Dessa hjälper oss att komma ihåg dina preferenser 
                  och val för att ge dig en mer personlig upplevelse.
                </li>
                <li>
                  <strong>Analytiska cookies:</strong> Dessa hjälper oss att förstå hur besökare interagerar 
                  med webbplatsen genom att samla in och rapportera anonym information.
                </li>
              </ul>
              
              <h3 className="text-lg font-medium mb-2 mt-6">Hantera cookies</h3>
              <p className="mb-4">
                Du kan hantera cookies genom att justera inställningarna i din webbläsare. 
                Du kan blockera eller ta bort cookies som redan finns på din enhet och ställa 
                in din webbläsare för att förhindra att de tas emot.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Behandling av personuppgifter</h2>
              <p className="mb-4">
                Vi behandlar personuppgifter i enlighet med gällande dataskyddslagstiftning, inklusive 
                EU:s allmänna dataskyddsförordning (GDPR).
              </p>
              
              <h3 className="text-lg font-medium mb-2 mt-6">Vilken information samlar vi in?</h3>
              <p className="mb-4">
                Vi kan samla in personuppgifter som namn, e-postadress, telefonnummer och företagsuppgifter 
                när du kontaktar oss, använder våra tjänster eller fyller i formulär på vår webbplats.
              </p>

              <h3 className="text-lg font-medium mb-2 mt-6">Hur använder vi din information?</h3>
              <p className="mb-4">
                Vi använder dina personuppgifter för att tillhandahålla och förbättra våra tjänster, 
                kommunicera med dig och uppfylla våra rättsliga skyldigheter.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Kontaktinformation</h2>
              <p>
                Om du har frågor om vår integritetspolicy eller hur vi hanterar dina personuppgifter, 
                vänligen kontakta oss på: <a href="mailto:info@reconstructor.se" className="text-blue-600 underline">info@reconstructor.se</a>
              </p>
            </section>
          </>
        ) : (
          <>
            <section dir="rtl" className="mb-8 text-right">
              <h2 className="text-xl font-semibold mb-4">کوکی‌ها و فناوری‌های مشابه</h2>
              <p className="mb-4">
                ما از کوکی‌ها و فناوری‌های مشابه در وب‌سایت خود برای بهبود تجربه شما، تجزیه و تحلیل ترافیک و برای اهداف بازاریابی استفاده می‌کنیم. 
                کوکی‌ها فایل‌های متنی کوچکی هستند که هنگام بازدید از یک وب‌سایت روی دستگاه شما ذخیره می‌شوند.
              </p>
              
              <h3 className="text-lg font-medium mb-2 mt-6">ما از چه نوع کوکی‌هایی استفاده می‌کنیم؟</h3>
              <ul className="list-disc pr-5 mb-4 space-y-2">
                <li>
                  <strong>کوکی‌های ضروری:</strong> این‌ها برای عملکرد وب‌سایت بسیار مهم هستند و نمی‌توانند در سیستم‌های ما خاموش شوند.
                </li>
                <li>
                  <strong>کوکی‌های عملکردی:</strong> این‌ها به ما کمک می‌کنند تا ترجیحات و انتخاب‌های شما را برای ارائه تجربه‌ای شخصی‌تر به خاطر بسپاریم.
                </li>
                <li>
                  <strong>کوکی‌های تحلیلی:</strong> این‌ها به ما کمک می‌کنند تا با جمع‌آوری و گزارش اطلاعات ناشناس، درک کنیم چگونه بازدیدکنندگان با وب‌سایت تعامل می‌کنند.
                </li>
              </ul>
              
              <h3 className="text-lg font-medium mb-2 mt-6">مدیریت کوکی‌ها</h3>
              <p className="mb-4">
                شما می‌توانید با تنظیم تنظیمات در مرورگر خود، کوکی‌ها را مدیریت کنید. 
                می‌توانید کوکی‌هایی که قبلاً روی دستگاه شما وجود دارد را مسدود یا حذف کنید و مرورگر خود را برای جلوگیری از دریافت آنها تنظیم کنید.
              </p>
            </section>

            <section dir="rtl" className="mb-8 text-right">
              <h2 className="text-xl font-semibold mb-4">پردازش اطلاعات شخصی</h2>
              <p className="mb-4">
                ما اطلاعات شخصی را مطابق با قوانین حفاظت از داده‌ها، از جمله مقررات عمومی حفاظت از داده‌های اتحادیه اروپا (GDPR) پردازش می‌کنیم.
              </p>
              
              <h3 className="text-lg font-medium mb-2 mt-6">ما چه اطلاعاتی جمع‌آوری می‌کنیم؟</h3>
              <p className="mb-4">
                ما ممکن است اطلاعات شخصی مانند نام، آدرس ایمیل، شماره تلفن و اطلاعات شرکت را هنگامی که با ما تماس می‌گیرید، 
                از خدمات ما استفاده می‌کنید یا فرم‌هایی را در وب‌سایت ما پر می‌کنید، جمع‌آوری کنیم.
              </p>

              <h3 className="text-lg font-medium mb-2 mt-6">ما چگونه از اطلاعات شما استفاده می‌کنیم؟</h3>
              <p className="mb-4">
                ما از اطلاعات شخصی شما برای ارائه و بهبود خدمات خود، ارتباط با شما و انجام تعهدات قانونی خود استفاده می‌کنیم.
              </p>
            </section>

            <section dir="rtl" className="mb-8 text-right">
              <h2 className="text-xl font-semibold mb-4">اطلاعات تماس</h2>
              <p>
                اگر سوالی در مورد سیاست حفظ حریم خصوصی ما یا نحوه مدیریت اطلاعات شخصی خود دارید، 
                لطفاً با ما از طریق <a href="mailto:info@reconstructor.se" className="text-blue-600 underline">info@reconstructor.se</a> تماس بگیرید.
              </p>
            </section>
          </>
        )}
      </div>
    </main>
  );
};

export default PrivacyPolicy;
