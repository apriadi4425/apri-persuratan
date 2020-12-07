import React from 'react';

const TableKategoriKomponentt = ({KategoriTable}) => {
    return(
        <div className='table-responsive'>
                 <table className='table'>
                   <tr>
                     <td>Nama</td>
                     <td>Januari</td>
                     <td>Februari</td>
                     <td>Maret</td>
                     <td>April</td>
                     <td>Mei</td>
                     <td>Juni</td>
                     <td>Juli</td>
                     <td>Agustus</td>
                     <td>September</td>
                     <td>Oktober</td>
                     <td>November</td>
                     <td>Desember</td>
                   </tr>
                   <tbody>
                   {
                    KategoriTable.map((list, index) => (
                      <tr key={index}>
                        <td>{list.nama_kategori}</td>
                        <td>{list.Januari}</td>
                        <td>{list.Februari}</td>
                        <td>{list.Maret}</td>
                        <td>{list.April}</td>
                        <td>{list.Mei}</td>
                        <td>{list.Juni}</td>
                        <td>{list.Juli}</td>
                        <td>{list.Agustus}</td>
                        <td>{list.September}</td>
                        <td>{list.Oktober}</td>
                        <td>{list.November}</td>
                        <td>{list.Desember}</td>
                      </tr>
                    ))
                  }
                   </tbody>
                 </table>
                 </div>
    )
}

const KategoriTableKomponent = React.memo(TableKategoriKomponentt);
export default KategoriTableKomponent;