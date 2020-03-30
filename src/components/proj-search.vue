<template>
  <div>
     <form @submit.prevent="search()">
     <input type="text" placeholder="Free Search" title="search by name, title, organizition, descriptiom or place"
     v-model="filterBy.txt" />

       Category<select placeholder="Category" v-model="filterBy.category"  >    
      <option value="all">all</option>
      <option value="animalsAndWildlife">Animals & Wildlife</option>
      <option value="education">Education</option>
      <option value="childcare">Child Care</option>
      <option value="environmentalProtection">Environmental Protection</option>
      <option value="farming">Farming</option>
      <option value="scubaDiving">Scuba Diving</option>
      <option value="humanitarian">Humanitarian</option>
      <option value="healthcare">Healthcare</option>
      <option value="sports">Sports</option>
      <option value="art">Child Care</option>
      <option value="humanRights">Human Rights</option>  
    </select>
   Minimum Age <el-input-number v-model="filterBy.minAge" :min="1" :max="120"></el-input-number>



      <button >Search</button>
    </form>
  </div>
</template>


<script>

export default {
  name: "projSearch",

    data() {
    return {
      filterBy: {
        txt:"",
       minAge: 1,
       category: "all",
       
      },
      // projs:"",
    }
  },
   methods: {
    search() { 

var parm='/projects/?';
for (const property in this.filterBy) {
  // console.log(`&${property}=${this.filterBy[property]}`);
  parm+=(`&${property}=${this.filterBy[property]}`);
}
  console.log(`${parm}`)
  this.$router.push(`${parm}`);
    }
  },
};



</script>
