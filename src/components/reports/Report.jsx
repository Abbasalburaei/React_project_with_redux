import moment from "moment";
import React from "react";
import { Ruller } from "../layouts/Common";
export const SendTransformReport = React.forwardRef(({
    headTitle='' ,
    subTitle = '',
    transformNo ='',
    sentDate='',
    companyName='',
    amount='',
    fees='',
    total='',
    currency='',
    note='',
    senderName = '',
    senderPhoneNumber = '',
    receiverName='',
    receiverPhoneNumber=''},ref)=>{

    return <div className="report core-lang-rtl" ref={ref}>
    <header className="report-header relative">
    <div className="absolute right-0 text-right rtl">
           <span className="mx-2">تاريخ الطباعة:</span>
           <span className="ctext-font-1">{moment().format('yyyy-MM-DD')}</span>
       </div>
     <div className="flex flex-row ">
       <h2 className="font-bold ctext-black">{headTitle}</h2>
     </div>
     <h3>{subTitle}</h3>
    </header>
    <Ruller/>
     <div className="my-2">
         <div className="flex flex-row core-gap-2">
         <div className="flex basis-2/4 flex-row core-gap-1 core-border core-border-lighter p-1">
             <span className="ctext-font-2 font-bold">رقم الحوالة:</span>
             <span className="ctext-font-2">{transformNo}</span>
           </div>
           <div className="flex basis-2/4 flex-row core-gap-1 core-border core-border-lighter p-1">
             <span className="ctext-font-2 font-bold">تاريخ الارسال:</span>
             <span className="ctext-font-2">{sentDate}</span>
           </div>
           <div className="flex basis-2/4 flex-row core-gap-1 core-border core-border-lighter p-1">
             <span className="ctext-font-2 font-bold">عبر:</span>
             <span className="ctext-font-2">{companyName}</span>
           </div>
         </div>
     </div>
     <div className="my-2">
      <table className="table table-bordered ">
          <thead className="table-dark">
             <tr>
             <th>بيانات الحوالة</th>
             <th></th>
            </tr>
          </thead>
          <tbody>
             <tr>
             <td>مبلغ الحوالة</td>
             <td>{amount}</td>
            </tr>
            <tr>
             <td>رسوم الحوال</td>
             <td>{fees}</td>
            </tr>
            <tr>
             <td>عملة الحوالة</td>
             <td>{currency}</td>
            </tr>
            <tr>
             <td>الاجمالي</td>
             <td>{total}</td>
            </tr>
          </tbody>
      </table>
      <div className="core-border core-border-lighter flex flex-row p-1 items-center">
      <span className="ctext-font-2 font-bold">ملاحظة :</span>
      <p className="ctext-font-2">{note}</p>
      </div>
      <div className="flex flex-row core-gap-2 my-2">
         <div className="flex basis-2/4 flex-col core-gap-1 core-border core-border-lighter p-1">
             <h3 className="core-border-rtl core-border-black px-1">بيانات المرسل</h3>
             <div className="flex flex-row core-gap-1">                
             <span className="ctext-font-1 font-bold">الاسم:</span>
             <span className="ctext-font-1">{senderName}</span>
             </div>
             <div className="flex flex-row core-gap-1">                
             <span className="ctext-font-1 font-bold">رقم الهاتف:</span>
             <span className="ctext-font-1">{senderPhoneNumber}</span>
             </div>
           </div>
           <div className="flex basis-2/4 flex-col core-gap-1 core-border core-border-lighter p-1">
             <h3 className="core-border-rtl core-border-black px-1">بيانات المستلم</h3>
             <div className="flex flex-row core-gap-1">                
             <span className="ctext-font-1 font-bold">الاسم:</span>
             <span className="ctext-font-1">{receiverName}</span>
             </div>
             <div className="flex flex-row core-gap-1">                
             <span className="ctext-font-1 font-bold">رقم الهاتف:</span>
             <span className="ctext-font-1">{receiverPhoneNumber}</span>
             </div>
           </div>
         </div>
         <footer className="flex flex-row core-gap-2 my-4">
            <div className="basis-2/4">
                    <div className="flex flex-col core-gap-1"> 
                      <div className="flex flex-row core-gap-1 items-center justify-center">
                      <span className="font-bold">اسم المرسل:</span>
                      <div className="w-full h-px ctext-bg-black"></div>
                      </div>
                      <div className="flex flex-row core-gap-1 justify-items">
                      <span className="ctext-font-1 font-bold">توقيع المرسل:</span>
                      <div className="w-full h-12 core-border core-border-black"></div>
                      </div>
                    </div>
            </div>
            <div className="basis-2/4">
                    <div className="flex flex-col core-gap-1"> 
                      <div className="flex flex-row core-gap-1 items-center justify-center">
                      <span className="font-bold justify-center">اسم الموظف:</span>
                      <div className="w-full h-px ctext-bg-black"></div>
                      </div>
                      <div className="flex flex-row core-gap-1 justify-items">
                      <span className="ctext-font-1 font-bold">توقيع الموظف:</span>
                      <div className="w-full h-12 core-border core-border-black"></div>
                      </div>
                    </div>
            </div>
         </footer>
      </div>
 </div>
});

export const ReceiveTransformReport = React.forwardRef(({
  headTitle='' ,
  subTitle = '',
  transformNo ='',
  companyName='',
  amount='',
  fees='',
  total='',
  currency='',
  note='',
  senderName ='',
  receivedDate = '',
  senderPhoneNumber = '',
  receiverName='',
  receiverIdentityCardPath = null,
  receiverPhoneNumber=''},ref)=>{

  return <div className="report core-lang-rtl" ref={ref}>
  <header className="report-header relative">
  <div className="absolute right-0 text-right rtl">
         <span className="mx-2">تاريخ الطباعة:</span>
         <span className="ctext-font-1">{moment().format('yyyy-MM-DD')}</span>
     </div>
   <div className="flex flex-row ">
     <h2 className="font-bold ctext-black">{headTitle}</h2>
   </div>
   <h3>{subTitle}</h3>
  </header>
  <Ruller/>
   <div className="my-2">
       <div className="flex flex-row core-gap-2">
       <div className="flex basis-2/4 flex-row core-gap-1 core-border core-border-lighter p-1">
           <span className="ctext-font-2 font-bold">رقم الحوالة:</span>
           <span className="ctext-font-2">{transformNo}</span>
         </div>
         <div className="flex basis-2/4 flex-row core-gap-1 core-border core-border-lighter p-1">
           <span className="ctext-font-2 font-bold">تاريخ الاستلام</span>
           <span className="ctext-font-2">{receivedDate}</span>
         </div>
         <div className="flex basis-2/4 flex-row core-gap-1 core-border core-border-lighter p-1">
           <span className="ctext-font-2 font-bold">عبر:</span>
           <span className="ctext-font-2">{companyName}</span>
         </div>
       </div>
   </div>
   <div className="my-2">
    <table className="table table-bordered ">
        <thead className="table-dark">
           <tr>
           <th>بيانات الحوالة</th>
           <th></th>
          </tr>
        </thead>
        <tbody>
           <tr>
           <td>مبلغ الحوالة</td>
           <td>{amount}</td>
          </tr>
          <tr>
           <td>عملة الحوالة</td>
           <td>{currency}</td>
          </tr>
          <tr>
           <td>الاجمالي</td>
           <td>{amount}</td>
          </tr>
        </tbody>
    </table>
    <div className="core-border core-border-lighter flex flex-row p-1 items-center">
    <span className="ctext-font-2 font-bold">ملاحظة :</span>
    <p className="ctext-font-2">{note}</p>
    </div>
    <div className="flex flex-row core-gap-2 my-2">
       <div className="flex basis-2/4 flex-col core-gap-1 core-border core-border-lighter p-1">
           <h3 className="core-border-rtl core-border-black px-1">بيانات المرسل</h3>
           <div className="flex flex-row core-gap-1">                
           <span className="ctext-font-1 font-bold">الاسم:</span>
           <span className="ctext-font-1">{senderName}</span>
           </div>
           <div className="flex flex-row core-gap-1">                
           <span className="ctext-font-1 font-bold">رقم الهاتف:</span>
           <span className="ctext-font-1">{senderPhoneNumber}</span>
           </div>
         </div>
         <div className="flex basis-2/4 flex-col core-gap-1 core-border core-border-lighter p-1">
           <h3 className="core-border-rtl core-border-black px-1">بيانات المستلم</h3>
           <div className="flex flex-row core-gap-1">                
           <span className="ctext-font-1 font-bold">الاسم:</span>
           <span className="ctext-font-1">{receiverName}</span>
           </div>
           <div className="flex flex-row core-gap-1">                
           <span className="ctext-font-1 font-bold">رقم الهاتف:</span>
           <span className="ctext-font-1">{receiverPhoneNumber}</span>
           </div>
           <div className="flex flex-row core-gap-1">                
           <span className="ctext-font-1 font-bold">صورة الهوية</span>
            <div className="h-50 w-full">
            <img src={receiverIdentityCardPath} className='object-contain'  alt={receiverName}/>
            </div>
           </div>
         </div>
       </div>
       <footer className="flex flex-row core-gap-2 my-4">
          <div className="basis-2/4">
                  <div className="flex flex-col core-gap-1"> 
                    <div className="flex flex-row core-gap-1 items-center justify-center">
                    <span className="font-bold">اسم المرسل:</span>
                    <div className="w-full h-px ctext-bg-black"></div>
                    </div>
                    <div className="flex flex-row core-gap-1 justify-items">
                    <span className="ctext-font-1 font-bold">توقيع المرسل:</span>
                    <div className="w-full h-12 core-border core-border-black"></div>
                    </div>
                  </div>
          </div>
          <div className="basis-2/4">
                  <div className="flex flex-col core-gap-1"> 
                    <div className="flex flex-row core-gap-1 items-center justify-center">
                    <span className="font-bold justify-center">اسم الموظف:</span>
                    <div className="w-full h-px ctext-bg-black"></div>
                    </div>
                    <div className="flex flex-row core-gap-1 justify-items">
                    <span className="ctext-font-1 font-bold">توقيع الموظف:</span>
                    <div className="w-full h-12 core-border core-border-black"></div>
                    </div>
                  </div>
          </div>
       </footer>
    </div>
</div>
});

export const TransformDailyReport = React.forwardRef(({
 headTitle = '',
 subTitle = '',
 columnDef = [],
 rowsData = []
},ref)=>{
  return <div className="report-table core-lang-rtl" ref={ref}>
  <header className="report-header relative">
      <div className="absolute right-0 text-right rtl">
          <span className="mx-2">تاريخ الطباعة:</span>
          <span className="ctext-font-1">{moment().format('yyyy-MM-DD')}</span>
      </div>
      <div className="flex flex-row ">
          <h2 className="font-bold ctext-black">{headTitle}</h2>
      </div>
      <h3>{subTitle}</h3>
      <Ruller />
  </header>
  <table className='report-table table table-bordered' >
  <thead>
      <tr>
          {columnDef.map((item, index) => {
              return <th key={index}>{item}</th>
          })}
      </tr>
  </thead>
  <tbody>
     {
      rowsData.map((item,index)=>{
        return <tr key={index}>
           <td>{moment(item?.transformDate).format('yyyy-MM-D')}</td>
           <td>{item?.transformCount}</td>
           <td>{item?.totalFess}</td>
           <td>{item?.sentAmountTotal}</td>
           <td>{item?.receivedAmountToatl}</td>
        </tr>
      })
     }
  </tbody>
</table>
</div>
});

export const TransformSpecialReport = React.forwardRef(({
  headTitle = '',
  subTitle = '',
  columnDef = [],
  rowsData = []
 },ref)=>{
   return <div className="report-table core-lang-rtl" ref={ref}>
   <header className="report-header relative">
       <div className="absolute right-0 text-right rtl">
           <span className="mx-2">تاريخ الطباعة:</span>
           <span className="ctext-font-1">{moment().format('yyyy-MM-DD')}</span>
       </div>
       <div className="flex flex-row ">
           <h2 className="font-bold ctext-black">{headTitle}</h2>
       </div>
       <h3>{subTitle}</h3>
       <Ruller />
   </header>
   <table className='report-table table table-bordered' >
   <thead>
       <tr>
           {columnDef.map((item, index) => {
               return <th key={index}>{item}</th>
           })}
       </tr>
   </thead>
   <tbody>
      {
       rowsData.map((item,index)=>{
         return <tr key={index}>
            <td>{item?.transformNo}</td>
            <td>{item?.operationDate}</td>
            <td>{item?.done ? <span className="ctext-danger ctext-font-1">استلام</span> : <span className="ctext-primary ctext-font-1">ارسال</span>}</td>
            <td>{item?.senderName}</td>
            <td>{item?.senderPhoneNumber}</td>
            <td>{item?.receiverName}</td>
            <td>{item?.receiverPhoneNumber}</td>
            <td>{item?.amountTotal}</td>
         </tr>
       })
      }
   </tbody>
 </table>
 </div>
 })