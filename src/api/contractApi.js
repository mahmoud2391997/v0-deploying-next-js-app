const mockContracts = [
  { id: 1, name: "عقد إيجار تجاري - الوحدة ١", status: "نشط" },
  { id: 2, name: "عقد إيجار سكني - الوحدة ٢", status: "نشط" },
  { id: 3, name: "عقد إيجار تجاري - الوحدة ٣", status: "منتهي" },
];

export const getContracts = async () => {
  return [...mockContracts];
};

export const addContract = async (contractData) => {
  return { id: Date.now(), ...contractData };
};

export const deleteContract = async (id) => {
  return id;
};
