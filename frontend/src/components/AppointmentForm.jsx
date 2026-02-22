import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const AppointmentForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [nic, setNic] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [department, setDepartment] = useState("Pediatrics");
  const [doctorFirstName, setDoctorFirstName] = useState("");
  const [doctorLastName, setDoctorLastName] = useState("");
  const [address, setAddress] = useState("");
  const [hasVisited, setHasVisited] = useState(false);
  const [doctors, setDoctors] = useState([]);

  const departmentsArray = ["Pediatrics", "Orthopedics", "Cardiology", "Neurology", "Oncology", "Radiology", "Physical Therapy", "Dermatology", "ENT"];

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/v1/user/doctors", { withCredentials: true });
        setDoctors(data.doctors);
      } catch { }
    };
    fetchDoctors();
  }, []);

  const handleAppointment = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:5000/api/v1/appointment/post",
        {
          firstName, lastName, email, phone, nic, dob, gender, appointment_date: appointmentDate, department,
          doctor_firstName: doctorFirstName, doctor_lastName: doctorLastName, hasVisited: Boolean(hasVisited), address
        },
        { withCredentials: true, headers: { "Content-Type": "application/json" } });
      toast.success(data.message);
      setFirstName(""); setLastName(""); setEmail(""); setPhone("");
      setNic(""); setDob(""); setGender(""); setAppointmentDate("");
      setDepartment(""); setDoctorFirstName(""); setDoctorLastName("");
      setHasVisited(false); setAddress("");
    } catch (error) { toast.error(error.response.data.message); }
  };

  const inputCls = "w-full text-base px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 outline-none ring-theme focus:bg-white placeholder-gray-400 transition-all";
  const Label = ({ children }) => <label className="text-sm font-semibold text-gray-600 mb-1.5 block">{children}</label>;
  const SectionHeader = ({ step, title, subtitle }) => (
    <div className="flex items-center gap-4 mb-6">
      <div className="w-10 h-10 rounded-full bg-theme-gradient flex items-center justify-center text-white font-black text-base shrink-0">{step}</div>
      <div>
        <h3 className="text-lg font-black text-gray-800">{title}</h3>
        <p className="text-sm text-gray-400">{subtitle}</p>
      </div>
    </div>
  );

  return (
    <div className="bg-theme-light px-6 xl:px-24 py-16">
      <div className="text-center mb-12">
        <span className="inline-flex items-center gap-2 bg-white text-theme-primary px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
          📅 Easy Online Booking
        </span>
        <h2 className="text-4xl font-black text-gray-900 mb-3">Book an Appointment</h2>
        <p className="text-gray-500 text-lg max-w-xl mx-auto">
          Fill in the details below and our team will confirm your appointment within 24 hours.
        </p>
      </div>

      <form onSubmit={handleAppointment} className="max-w-4xl mx-auto flex flex-col gap-6">
        {/* Section 1 */}
        <div className="bg-white rounded-3xl shadow-sm p-8 border border-gray-100">
          <SectionHeader step="1" title="Personal Information" subtitle="Tell us a bit about yourself" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div><Label>First Name</Label><input type="text" placeholder="John" value={firstName} onChange={(e) => setFirstName(e.target.value)} className={inputCls} /></div>
            <div><Label>Last Name</Label><input type="text" placeholder="Doe" value={lastName} onChange={(e) => setLastName(e.target.value)} className={inputCls} /></div>
            <div><Label>Email Address</Label><input type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} className={inputCls} /></div>
            <div><Label>Phone Number</Label><input type="number" placeholder="9876543210" value={phone} onChange={(e) => setPhone(e.target.value)} className={inputCls} /></div>
            <div><Label>Aadhar Number</Label><input type="number" placeholder="1234 5678 9012" value={nic} onChange={(e) => setNic(e.target.value)} className={inputCls} /></div>
            <div><Label>Date of Birth</Label><input type="date" value={dob} onChange={(e) => setDob(e.target.value)} className={inputCls} /></div>
            <div><Label>Gender</Label>
              <select value={gender} onChange={(e) => setGender(e.target.value)} className={inputCls}>
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
          </div>
        </div>

        {/* Section 2 */}
        <div className="bg-white rounded-3xl shadow-sm p-8 border border-gray-100">
          <SectionHeader step="2" title="Appointment Details" subtitle="Choose your preferred date, department and doctor" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div><Label>Appointment Date</Label><input type="date" value={appointmentDate} onChange={(e) => setAppointmentDate(e.target.value)} className={inputCls} /></div>
            <div><Label>Department</Label>
              <select value={department} onChange={(e) => { setDepartment(e.target.value); setDoctorFirstName(""); setDoctorLastName(""); }} className={inputCls}>
                <option value="">Select Department</option>
                {departmentsArray.map((d, i) => <option value={d} key={i}>{d}</option>)}
              </select>
            </div>
            <div className="sm:col-span-2"><Label>Preferred Doctor</Label>
              <select value={JSON.stringify({ firstName: doctorFirstName, lastName: doctorLastName })}
                onChange={(e) => { const { firstName, lastName } = JSON.parse(e.target.value); setDoctorFirstName(firstName); setDoctorLastName(lastName); }}
                disabled={!department} className={`${inputCls} disabled:opacity-50 disabled:cursor-not-allowed`}>
                <option value="">Select Doctor</option>
                {doctors.filter((d) => d.doctorDepartment === department).map((d, i) => (
                  <option key={i} value={JSON.stringify({ firstName: d.firstName, lastName: d.lastName })}>Dr. {d.firstName} {d.lastName}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Section 3 */}
        <div className="bg-white rounded-3xl shadow-sm p-8 border border-gray-100">
          <SectionHeader step="3" title="Additional Information" subtitle="Help us prepare better for your visit" />
          <div className="flex flex-col gap-5">
            <div><Label>Home Address</Label>
              <textarea rows={4} value={address} onChange={(e) => setAddress(e.target.value)} placeholder="123 Main Street, City, Country"
                className="w-full text-base px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 outline-none ring-theme focus:bg-white placeholder-gray-400 resize-none transition-all" />
            </div>
            <div className="flex items-center justify-between bg-theme-light border border-theme rounded-2xl px-5 py-4 cursor-pointer"
              onClick={() => setHasVisited(!hasVisited)}>
              <div>
                <p className="text-gray-800 font-semibold">Have you visited Nexora Health before?</p>
                <p className="text-gray-400 text-sm mt-0.5">Helps us retrieve your previous records</p>
              </div>
              <div className={`w-12 h-6 rounded-full transition-colors duration-300 flex items-center px-1 ${hasVisited ? "bg-theme-primary" : "bg-gray-300"}`}>
                <div className={`w-4 h-4 bg-white rounded-full shadow transition-transform duration-300 ${hasVisited ? "translate-x-6" : "translate-x-0"}`}></div>
              </div>
            </div>
          </div>
        </div>

        <button type="submit"
          className="w-full py-4 text-white font-black text-lg rounded-2xl bg-theme-gradient-r hover:opacity-90 transition-opacity shadow-lg">
          Confirm Appointment →
        </button>
      </form>
    </div>
  );
};

export default AppointmentForm;
