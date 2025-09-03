import React from 'react';
import { useTranslation } from 'react-i18next';
import { useReconstructionCalculator } from '@/hooks/useReconstructionCalculator';
import { Link } from 'react-router-dom';

const Tooltip = ({ children, content }) => (
  <div className="relative inline-flex items-center group">
    <button 
      type="button" 
      className="w-6 h-6 rounded-full border border-gray-300 font-semibold text-sm ml-2 hover:bg-gray-50"
      aria-label="info"
    >
      ?
    </button>
    <div className="absolute z-10 top-full left-0 min-w-64 max-w-80 p-3 mt-1 border border-gray-200 bg-white rounded-sm shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible group-focus-within:opacity-100 group-focus-within:visible transition-opacity text-sm leading-relaxed">
      {content}
    </div>
  </div>
);

const InputField = ({ 
  id, 
  label, 
  value, 
  onChange, 
  type = "number", 
  min = "0", 
  placeholder = "0", 
  unit, 
  tooltip,
  helpText,
  required = true 
}) => (
  <div>
    <label htmlFor={id} className="block font-medium mb-1 flex items-center">
      {label}
      {tooltip && <Tooltip content={tooltip} />}
    </label>
    <div className="flex">
      <input
        id={id}
        name={id}
        type={type}
        min={min}
        required={required}
        value={value}
        onChange={(e) => onChange(id, e.target.value)}
        className="w-full border border-gray-300 rounded-sm px-3 py-2 focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
        placeholder={placeholder}
        inputMode="numeric"
      />
      {unit && (
        <span className="inline-flex items-center border border-l-0 border-gray-300 rounded-r-sm px-3 bg-gray-50">
          {unit}
        </span>
      )}
    </div>
    {helpText && <p className="text-sm text-gray-500 mt-1">{helpText}</p>}
  </div>
);

function ReconstructionCalculator() {
  const { t } = useTranslation();
  const {
    formData,
    updateFormData,
    handleCalculate,
    resetCalculator,
    results,
    showResults,
    formatNumber
  } = useReconstructionCalculator();

  const ComparisonGrid = () => {
    const features = [
      { key: 'documents', rb: true, lawyer: true },
      { key: 'creditor_contact', rb: true, lawyer: true },
      { key: 'experienced_help', rb: true, lawyer: true },
      { key: 'your_interests', rb: true, lawyer: false },
      { key: 'keep_control', rb: true, lawyer: false },
      { key: 'fixed_price', rb: true, lawyer: false },
      { key: 'optimization', rb: true, lawyer: false },
      { key: 'guarantee', rb: true, lawyer: false },
    ];

    return (
      <div className="grid grid-cols-[1fr_auto_auto] gap-3 gap-x-4 items-center text-sm">
        <div></div>
        <div className="font-semibold text-sky-700 text-center">RB*</div>
        <div className="font-semibold text-gray-500 text-center">R/A**</div>

        {features.map((feature) => (
          <React.Fragment key={feature.key}>
            <div className="py-1">
              {t(`calculator.features.${feature.key}`, feature.key)}
            </div>
            <div className="text-center py-1">
              <span className={feature.rb ? "text-sky-500" : "text-gray-400"}>
                {feature.rb ? "✓" : "✕"}
              </span>
            </div>
            <div className="text-center py-1">
              <span className={feature.lawyer ? "text-sky-500" : "text-gray-400"}>
                {feature.lawyer ? "✓" : "✕"}
              </span>
            </div>
          </React.Fragment>
        ))}
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Calculator Form */}
      <section className="bg-white border border-gray-200 rounded-sm p-6 md:p-8 shadow-sm">
        <h2 className="text-xl font-semibold mb-2">
          {t('calculator.title', 'Rekonstruktionskalkylator')}
        </h2>
        <p className="text-gray-600 mb-3">
          {t('calculator.description', 'Den här kalkylatorn ger en grov uppskattning av besparing och kostnad vid en företagsrekonstruktion, samt skillnaden mellan att anlita Reconstructor och en rekonstruktör/advokat.')}
        </p>
        <p className="text-gray-600 mb-6">
          {t('calculator.disclaimer', 'Observera att detta är en förenklad modell. Exakta värden kräver genomgång av företagets faktiska förhållanden.')}
        </p>

        <form onSubmit={handleCalculate} className="space-y-5">
          <InputField
            id="numEmployees"
            label={t('calculator.fields.num_employees', 'Antal anställda')}
            value={formData.numEmployees}
            onChange={updateFormData}
            unit="st"
            tooltip={t('calculator.tooltips.num_employees', 'Ange samtliga anställda oavsett arbetstid. Ägare och närstående som är anställda räknas inte med.')}
          />

          <InputField
            id="supplierDebt"
            label={t('calculator.fields.supplier_debt', 'Leverantörsskulder')}
            value={formData.supplierDebt}
            onChange={updateFormData}
            unit="kr"
            tooltip={t('calculator.tooltips.supplier_debt', 'Skulder till leverantörer (varor, hyra, el, försäkring, förbrukning, annonsering m.m.). Inklusive moms.')}
          />

          <InputField
            id="taxLiabilities"
            label={t('calculator.fields.tax_liabilities', 'Skatteskulder')}
            value={formData.taxLiabilities}
            onChange={updateFormData}
            unit="kr"
            tooltip={t('calculator.tooltips.tax_liabilities', 'Inkludera även skatter med anstånd som ännu inte förfallit.')}
            helpText={t('calculator.help.tax_liabilities', 'Inklusive skatter med anstånd')}
          />

          {/* VAT Accounting Period */}
          <fieldset>
            <legend className="block font-medium mb-1 flex items-center">
              {t('calculator.fields.vat_accounting', 'Redovisning av moms')}
              <Tooltip content={t('calculator.tooltips.vat_accounting', 'Välj redovisningsperiod för moms (år/kvartal/månad). Används här för en enkel uppskattning av oreglerad moms.')} />
            </legend>
            <div className="flex gap-4">
              {[
                { value: '12', label: t('calculator.vat_periods.yearly', 'År') },
                { value: '4', label: t('calculator.vat_periods.quarterly', 'Kvartal') },
                { value: '1', label: t('calculator.vat_periods.monthly', 'Månad') }
              ].map((option) => (
                <label key={option.value} className="inline-flex items-center gap-2">
                  <input
                    type="radio"
                    name="vatAccounting"
                    value={option.value}
                    checked={formData.vatAccounting === option.value}
                    onChange={(e) => updateFormData('vatAccounting', e.target.value)}
                    className="text-sky-600 focus:ring-sky-500"
                  />
                  <span>{option.label}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <InputField
            id="vatPrevious"
            label={t('calculator.fields.vat_previous', 'Belopp företaget betalade vid senaste momsdeklaration')}
            value={formData.vatPrevious}
            onChange={updateFormData}
            unit="kr"
            tooltip={t('calculator.tooltips.vat_previous', 'Om du senast fick tillbaka moms: ange det senaste beloppet du betalade i stället (en representativ periodbetalning).')}
          />

          <button 
            type="submit"
            className="w-full bg-sky-600 hover:bg-sky-700 text-white font-semibold rounded-sm py-3 transition-colors"
          >
            {t('calculator.calculate_button', 'Kalkylera')}
          </button>
        </form>
      </section>

      {/* Results */}
      {showResults && results && (
        <section className="bg-white border border-gray-200 rounded-sm p-6 md:p-8 shadow-sm mt-8">
          <h2 className="text-xl font-semibold mb-2">
            {t('calculator.results.title', 'Ditt resultat')}
          </h2>
          <p className="mb-2">
            {t('calculator.results.savings_description', 'Genom att anlita Reconstructor sparar ditt företag')}{' '}
            <span className="text-sky-600 font-semibold font-mono">
              {formatNumber(results.savingsCompare)}
            </span>{' '}
            {t('calculator.results.savings_more', 'kr mer på en företagsrekonstruktion än om du anlitar en rekonstruktör/advokat.')}
          </p>
          <p className="mb-6">
            {t('calculator.results.cost_description', 'Genom att anlita Reconstructor kan din kostnad bli')}{' '}
            <span className="text-sky-600 font-semibold font-mono">
              {formatNumber(Math.abs(results.costCompare))}
            </span>{' '}
            kr{' '}
            <span className="font-medium">
              {results.costCompare <= 0 
                ? t('calculator.results.lower_cost', 'lägre än om du anlitar en rekonstruktör/advokat.')
                : t('calculator.results.higher_cost', 'högre än om du anlitar en rekonstruktör/advokat.')
              }
            </span>
          </p>

          <h3 className="text-lg font-semibold mb-2">
            {t('calculator.results.total_savings', 'Hur mycket du totalt sparar')}
          </h3>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="rounded-sm p-4 text-center bg-sky-50">
              <div className="text-sm text-sky-700 mb-1">Reconstructor</div>
              <div className="text-2xl font-semibold text-sky-700 font-mono">
                {formatNumber(results.netRb)} kr
              </div>
            </div>
            <div className="rounded-sm p-4 text-center bg-gray-50">
              <div className="text-sm text-gray-600 mb-1">
                {t('calculator.results.lawyer_label', 'Rekonstruktör/advokat')}
              </div>
              <div className="text-2xl font-semibold text-gray-700 font-mono">
                {formatNumber(results.netLaw)} kr
              </div>
            </div>
          </div>

          <h3 className="text-lg font-semibold mb-2">
            {t('calculator.results.total_cost', 'Hur stor din totala kostnad är')}
          </h3>
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="rounded-sm p-4 text-center bg-sky-50">
              <div className="text-sm text-sky-700 mb-1">Reconstructor</div>
              <div className="text-2xl font-semibold text-sky-700 font-mono">
                {formatNumber(results.feeRb)} kr
              </div>
            </div>
            <div className="rounded-sm p-4 text-center bg-gray-50">
              <div className="text-sm text-gray-600 mb-1">
                {t('calculator.results.lawyer_label', 'Rekonstruktör/advokat')}
              </div>
              <div className="text-2xl font-semibold text-gray-700 font-mono">
                {formatNumber(results.feeLaw)} kr
              </div>
            </div>
          </div>

          {/* Cost Breakdown Section */}
          <h3 className="text-lg font-semibold mb-2">
            {t('calculator.results.cost_breakdown', 'Kostnadsuppdelning')}
          </h3>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="rounded-sm p-4 bg-sky-50 border border-sky-200">
              <div className="text-sm font-medium text-sky-700 mb-2">Reconstructor</div>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-sky-600">{t('calculator.results.professional_fees', 'Professionella avgifter')}:</span>
                  <span className="font-mono">{formatNumber(results.rbFees)} kr</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sky-600">{t('calculator.results.court_fees', 'Domstolsavgifter')}:</span>
                  <span className="font-mono">{formatNumber(results.courtFees)} kr</span>
                </div>
                <div className="border-t border-sky-300 pt-1 flex justify-between font-semibold">
                  <span className="text-sky-700">Totalt:</span>
                  <span className="font-mono text-sky-700">{formatNumber(results.feeRb)} kr</span>
                </div>
              </div>
            </div>
            <div className="rounded-sm p-4 bg-gray-50 border border-gray-200">
              <div className="text-sm font-medium text-gray-700 mb-2">
                {t('calculator.results.lawyer_label', 'Rekonstruktör/advokat')}
              </div>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">{t('calculator.results.professional_fees', 'Professionella avgifter')}:</span>
                  <span className="font-mono">{formatNumber(results.lawyerFees)} kr</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">{t('calculator.results.court_fees', 'Domstolsavgifter')}:</span>
                  <span className="font-mono">{formatNumber(results.courtFees)} kr</span>
                </div>
                <div className="border-t border-gray-300 pt-1 flex justify-between font-semibold">
                  <span className="text-gray-700">Totalt:</span>
                  <span className="font-mono text-gray-700">{formatNumber(results.feeLaw)} kr</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-6 p-3 bg-blue-50 border border-blue-200 rounded-sm">
            <p className="text-xs text-blue-700">
              <strong>{t('calculator.results.court_fees', 'Domstolsavgifter')}:</strong> {t('calculator.results.court_fees_details', 'Ansökningsavgift (2 800 kr) + Tillsynsavgift (10 000 kr) + Kungörandeavgift (500 kr)')}
            </p>
          </div>

          <h4 className="text-lg font-semibold mb-2">
            {t('calculator.results.features_title', 'Detta ingår')}
          </h4>
          <ComparisonGrid />

          <div className="text-center mt-6 text-sm text-gray-600">
            <p>
              <span className="text-sky-600">*</span>{' '}
              {t('calculator.results.rb_note', 'Detta ingår när du anlitar Reconstructor')}
            </p>
            <p>
              <span>**</span>{' '}
              {t('calculator.results.lawyer_note', 'Detta ingår när du anlitar en rekonstruktör/advokat')}
            </p>
            <p>{t('calculator.results.estimated_note', 'Samtliga resultat är uppskattade')}</p>
          </div>

          <div className="mt-8 grid gap-3 md:grid-cols-2">
            <Link
              to="/kontakt"
              className="inline-flex items-center justify-center px-4 py-3 rounded-sm border border-sky-600 text-sky-700 hover:bg-sky-50 font-medium transition-colors"
            >
              {t('calculator.results.book_meeting', 'Boka ett möte med oss')}
            </Link>
            <button
              onClick={resetCalculator}
              className="px-4 py-3 rounded-sm border border-gray-300 hover:bg-gray-50 font-medium transition-colors"
            >
              {t('calculator.results.new_calculation', 'Gör en ny kalkyl')}
            </button>
          </div>

          {/* Assumptions */}
          <details className="mt-8">
            <summary className="font-semibold cursor-pointer">
              {t('calculator.assumptions.title', 'Antaganden i modellen')}
            </summary>
            <ul className="list-disc pl-6 mt-3 text-sm text-gray-700 space-y-1">
              <li>{t('calculator.assumptions.debt_reduction', 'Skuldreduktion (ackord) antas vara 50% på osäkrade skulder.')}</li>
              <li>{t('calculator.assumptions.vat_estimation', 'Oreglerad moms uppskattas med multiplikatorer: år = 0,25×, kvartal = 0,5×, månad = 1× av senaste betalning.')}</li>
              <li>{t('calculator.assumptions.rb_fees', 'Reconstructor: fast grundavgift + pris per anställd.')}</li>
              <li>{t('calculator.assumptions.lawyer_fees', 'Rekonstruktör/advokat: högre grundavgift + högre pris per anställd.')}</li>
              <li>{t('calculator.assumptions.savings_calculation', 'Besparing = (bruttobesparing) − (avgift). Samma ackordsnivå antas oavsett leverantör; skillnaden drivs av avgifter.')}</li>
            </ul>
          </details>
        </section>
      )}
    </div>
  );
}

export default ReconstructionCalculator;
