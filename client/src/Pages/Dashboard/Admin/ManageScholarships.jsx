import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { FaEye, FaPen, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import useRole from '../../../Hooks/useRole';

const ManageScholarships = () => {
  const { user, loading } = useRole();
  const [modalData, setModalData] = useState(null);

  const { data = [], isLoading, refetch } = useQuery({
    queryKey: ['manageScholarships'],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/all-data`);
      return res.data;
    }
  });

  const handleDelete = (id) => {
    axios.delete(`${import.meta.env.VITE_API_URL}/delete-scholarship/${id}?email=${user?.email}`)
      .then(res => {
        if (res.data.deletedCount > 0) {
          toast.success('Scholarship retracted from the academy.');
          refetch();
        }
      })
      .catch(err => toast.error('Retraction failed.'));
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    if (!modalData) return;

    const formData = new FormData(e.target);
    const updateData = Object.fromEntries(formData);

    // Convert numerical fields
    const numericData = {
      ...updateData,
      applicationFees: parseInt(updateData.applicationFees),
      serviceCharge: parseInt(updateData.serviceCharge),
      tuitionFees: parseInt(updateData.tuitionFees),
      universityWorldRank: parseInt(updateData.universityWorldRank)
    };

    const imageFile = new FormData();
    const file = formData.get('universityImage');

    const performUpdate = (imageUrl) => {
      axios.patch(`${import.meta.env.VITE_API_URL}/update-scholarship/${modalData._id}?email=${user?.email}`, {
        ...numericData,
        universityImage: imageUrl || modalData.universityImage
      })
        .then(res => {
          if (res.data.modifiedCount > 0) {
            toast.success('Scholarship updated with signature precision.');
            document.getElementById('edit_scholarship_modal').checked = false;
            refetch();
          }
        })
        .catch(err => toast.error('Update failed.'));
    };

    if (file && file.size > 0) {
      imageFile.append('image', file);
      fetch('https://api.imgbb.com/1/upload?key=48b282cb34af9841dcce86814f69cd23', {
        method: 'POST',
        body: imageFile,
      }).then(res => res.json())
        .then(res => performUpdate(res.data.url))
        .catch(err => toast.error('Image upload failed.'));
    } else {
      performUpdate();
    }
  };

  if (isLoading) return <div className="min-h-screen flex items-center justify-center bg-white"><span className="loading loading-spinner loading-lg text-green-600"></span></div>;

  return (
    <section className='bg-white min-h-screen py-10 px-4'>
      <div className="max-w-7xl mx-auto">
        <div className='flex justify-between items-center mb-10'>
          <div>
            <h2 className='text-3xl font-black text-black uppercase tracking-tight'>Manage Scholarships</h2>
            <p className='text-xs font-bold text-gray-400 uppercase tracking-widest mt-1'>Curate Global Academic Opportunities</p>
          </div>
          <div className='bg-black text-white px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest'>
            {data.length} Listings Active
          </div>
        </div>

        <div className="overflow-x-auto bg-white rounded-[32px] shadow-[0_20px_60px_rgba(0,0,0,0.05)] border border-gray-100">
          <table className="table w-full">
            <thead>
              <tr className='border-b border-gray-50 bg-gray-50/50'>
                <th className='p-6 text-[10px] font-black text-gray-400 uppercase tracking-widest'>University</th>
                <th className='p-6 text-[10px] font-black text-gray-400 uppercase tracking-widest'>Scholarship Name</th>
                <th className='p-6 text-[10px] font-black text-gray-400 uppercase tracking-widest'>Category</th>
                <th className='p-6 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center'>Fees</th>
                <th className='p-6 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item._id} className='hover:bg-green-50/30 transition-colors border-b border-gray-50'>
                  <td className='p-6'>
                    <div className='font-black text-black uppercase tracking-tight'>{item.universityName}</div>
                    <div className='text-[10px] font-bold text-gray-400 uppercase'>{item.universityCity}, {item.universityCountry}</div>
                  </td>
                  <td className='p-6'>
                    <div className='text-sm font-bold text-black'>{item.scholarshipName}</div>
                    <div className='text-[10px] font-black text-green-600 uppercase tracking-widest'>{item.degree}</div>
                  </td>
                  <td className='p-6'>
                    <span className='px-3 py-1 bg-gray-100 rounded-full text-[10px] font-black uppercase tracking-widest text-gray-600'>
                      {item.scholarshipCategory}
                    </span>
                  </td>
                  <td className='p-6 text-center'>
                    <div className='font-black text-black'>${item.applicationFees}</div>
                  </td>
                  <td className='p-6'>
                    <div className='flex justify-center gap-2'>
                      <label
                        onClick={() => setModalData(item)}
                        htmlFor='edit_scholarship_modal'
                        className="p-3 bg-gray-100 hover:bg-black hover:text-white rounded-xl transition-all cursor-pointer"
                        title="Edit Scholarship"
                      >
                        <FaPen size={12} />
                      </label>
                      <Link
                        to={`/scholarship-details/${item._id}`}
                        className="p-3 bg-gray-100 hover:bg-green-600 hover:text-white rounded-xl transition-all"
                        title="View Live"
                      >
                        <FaEye size={12} />
                      </Link>
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="p-3 bg-gray-100 hover:bg-red-500 hover:text-white rounded-xl transition-all"
                        title="Delete Listing"
                      >
                        <FaTrash size={12} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Edit Modal */}
        <input type="checkbox" id="edit_scholarship_modal" className="modal-toggle" />
        <div className="modal" role="dialog">
          <div className='modal-box rounded-[40px] max-w-4xl bg-white p-10 lg:p-14 shadow-2xl'>
            {modalData && (
              <form onSubmit={handleUpdate} className='space-y-8'>
                <div className='text-center'>
                  <h2 className='text-3xl font-black text-black uppercase tracking-tight mb-2'>Update Scholarship</h2>
                  <p className='text-gray-400 font-bold text-xs uppercase tracking-widest'>Elite Curatorial Adjustment</p>
                </div>

                <div className='grid md:grid-cols-3 gap-6'>
                  <div className='space-y-4'>
                    <div className="form-control">
                      <label className="label"><span className="label-text font-black text-[10px] uppercase tracking-widest text-gray-500">Scholarship Title</span></label>
                      <input name='scholarshipName' defaultValue={modalData.scholarshipName} required className="h-12 bg-gray-50 border-gray-200 rounded-xl px-4 font-bold text-black" />
                    </div>
                    <div className="form-control">
                      <label className="label"><span className="label-text font-black text-[10px] uppercase tracking-widest text-gray-500">University Name</span></label>
                      <input name='universityName' defaultValue={modalData.universityName} required className="h-12 bg-gray-50 border-gray-200 rounded-xl px-4 font-bold text-black" />
                    </div>
                    <div className="form-control">
                      <label className="label"><span className="label-text font-black text-[10px] uppercase tracking-widest text-gray-500">Update Logo</span></label>
                      <input name='universityImage' type="file" className="file-input file-input-bordered h-12 bg-gray-50 border-gray-200 rounded-xl" />
                    </div>
                  </div>

                  <div className='space-y-4'>
                    <div className="form-control">
                      <label className="label"><span className="label-text font-black text-[10px] uppercase tracking-widest text-gray-500">Subject Category</span></label>
                      <select name="subjectCategory" defaultValue={modalData.subjectCategory} className='h-12 bg-gray-50 border-gray-200 rounded-xl px-4 font-bold text-black'>
                        <option value="Agriculture">Agriculture</option>
                        <option value="Engineering">Engineering</option>
                        <option value="Doctor">Doctor</option>
                      </select>
                    </div>
                    <div className="form-control">
                      <label className="label"><span className="label-text font-black text-[10px] uppercase tracking-widest text-gray-500">Scholarship Type</span></label>
                      <select name="scholarshipCategory" defaultValue={modalData.scholarshipCategory} className='h-12 bg-gray-50 border-gray-200 rounded-xl px-4 font-bold text-black'>
                        <option value="Full fund">Full fund</option>
                        <option value="Partial">Partial</option>
                        <option value="Self-fund">Self-fund</option>
                      </select>
                    </div>
                    <div className="form-control">
                      <label className="label"><span className="label-text font-black text-[10px] uppercase tracking-widest text-gray-500">Applied Degree</span></label>
                      <select name="degree" defaultValue={modalData.degree} className='h-12 bg-gray-50 border-gray-200 rounded-xl px-4 font-bold text-black'>
                        <option value="Diploma">Diploma</option>
                        <option value="Bachelor">Bachelor</option>
                        <option value="Masters">Masters</option>
                      </select>
                    </div>
                  </div>

                  <div className='space-y-4'>
                    <div className="form-control">
                      <label className="label"><span className="label-text font-black text-[10px] uppercase tracking-widest text-gray-500">Application Fee ($)</span></label>
                      <input name='applicationFees' type="number" defaultValue={modalData.applicationFees} required className="h-12 bg-gray-50 border-gray-200 rounded-xl px-4 font-bold text-black" />
                    </div>
                    <div className="form-control">
                      <label className="label"><span className="label-text font-black text-[10px] uppercase tracking-widest text-gray-500">Service Charge ($)</span></label>
                      <input name='serviceCharge' type="number" defaultValue={modalData.serviceCharge} required className="h-12 bg-gray-50 border-gray-200 rounded-xl px-4 font-bold text-black" />
                    </div>
                    <div className="form-control">
                      <label className="label"><span className="label-text font-black text-[10px] uppercase tracking-widest text-gray-500">Deadline</span></label>
                      <input name='applicationDeadline' type="date" defaultValue={new Date(modalData.applicationDeadline).toISOString().split('T')[0]} required className="h-12 bg-gray-50 border-gray-200 rounded-xl px-4 font-bold text-black" />
                    </div>
                  </div>
                </div>

                <div className="form-control">
                  <label className="label"><span className="label-text font-black text-[10px] uppercase tracking-widest text-gray-500">Comprehensive Program Description</span></label>
                  <textarea name="description" defaultValue={modalData.description} required className='w-full rounded-2xl h-32 p-6 bg-gray-50 border-gray-200 font-bold focus:bg-white transition-all text-black'></textarea>
                </div>

                <div className='grid md:grid-cols-3 gap-6'>
                  <div className="form-control">
                    <label className="label"><span className="label-text font-black text-[10px] uppercase tracking-widest text-gray-500">Tuition Fees</span></label>
                    <input name='tuitionFees' type="number" defaultValue={modalData.tuitionFees} className="h-12 bg-gray-50 border-gray-200 rounded-xl px-4 font-bold text-black" />
                  </div>
                  <div className="form-control">
                    <label className="label"><span className="label-text font-black text-[10px] uppercase tracking-widest text-gray-500">World Rank</span></label>
                    <input name='universityWorldRank' type="number" defaultValue={modalData.universityWorldRank} className="h-12 bg-gray-50 border-gray-200 rounded-xl px-4 font-bold text-black" />
                  </div>
                  <div className="form-control">
                    <label className="label"><span className="label-text font-black text-[10px] uppercase tracking-widest text-gray-500">City / Country</span></label>
                    <div className='flex gap-2'>
                      <input name='universityCity' defaultValue={modalData.universityCity} placeholder='City' className="w-1/2 h-12 bg-gray-50 border-gray-200 rounded-xl px-4 font-bold text-black" />
                      <input name='universityCountry' defaultValue={modalData.universityCountry} placeholder='Country' className="w-1/2 h-12 bg-gray-50 border-gray-200 rounded-xl px-4 font-bold text-black" />
                    </div>
                  </div>
                </div>

                <div className='flex gap-4 pt-4'>
                  <button className='flex-1 h-16 bg-black text-white hover:bg-green-600 rounded-2xl font-black uppercase tracking-widest text-xs transition-all duration-300'>Commit Changes</button>
                  <label className='h-16 flex items-center justify-center px-10 bg-gray-100 text-gray-400 hover:bg-red-500 hover:text-white rounded-2xl font-black uppercase tracking-widest text-xs cursor-pointer transition-all duration-300' htmlFor="edit_scholarship_modal">Cancel</label>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ManageScholarships;