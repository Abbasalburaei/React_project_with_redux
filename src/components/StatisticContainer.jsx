export const StatisticContainer = ({title = '' , subTitle = '' , value = '' , className = 'core-border-primary'})=>{
    return <div className={`statistic core-border-rtl core-gap-1 ${className}`}>
    <h2 className="ctext-font-2 font-bold">{title}</h2>
    {subTitle && <p className="ctext-black ctext-font-1">{subTitle}</p> }
   <div className="statistic-content">
    {value}
   </div>
</div>
}