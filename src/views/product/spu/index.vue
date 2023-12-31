<template>
  <div>
    <Category :scene="scene"></Category>
    <el-card style="margin: 10px 0">
      <div v-show="scene === 0">
        <el-button
          type="primary"
          icon="Plus"
          :disabled="!categoryStore.c3Id"
          @click="addSpu"
        >
          添加SPU
        </el-button>
        <el-table border style="margin: 10px 0" :data="records">
          <el-table-column
            label="序号"
            type="index"
            align="center"
            width="80px"
          >
          </el-table-column>
          <el-table-column label="SPU名称" prop="spuName"> </el-table-column>
          <el-table-column
            label="SPU描述"
            prop="description"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column label="SPU操作">
            <template #default="{ row }">
              <el-button
                type="primary"
                size="small"
                icon="Plus"
                title="添加SKU"
                @click="addSku(row)"
              >
              </el-button>
              <el-button
                type="primary"
                size="small"
                icon="Edit"
                title="修改SPU"
                @click="updateSpu(row)"
              >
              </el-button>
              <el-button
                type="info"
                size="small"
                icon="Search"
                title="查看SKU列表"
                @click="findSku(row)"
              >
              </el-button>
              <el-popconfirm
                width="200px"
                :title="`你确定要删除${row.spuName}吗`"
                @confirm="deleteSpu(row)"
              >
                <template #reference>
                  <el-button
                    type="danger"
                    size="small"
                    icon="Delete"
                    title="删除SPU"
                  >
                  </el-button>
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          v-model:current-page="pageNo"
          v-model:page-size="pageSize"
          :page-sizes="[3, 5, 7, 9]"
          :background="true"
          layout=" prev, pager, next, jumper,->,sizes,total "
          :total="total"
          @current-change="getHasSpu"
          @size-change="changeSize"
        />
      </div>
      <SpuForm
        ref="SpuFormRef"
        v-show="scene === 1"
        @changeScene="changeScene"
      />
      <SkuForm
        ref="SkuFormRef"
        v-show="scene === 2"
        @changeScene="changeScene"
      />
      <el-dialog v-model="show" title="Sku列表">
        <el-table border :data="skuArr">
          <el-table-column label="SKU名字" prop="skuName"></el-table-column>
          <el-table-column label="SKU价格" prop="price"></el-table-column>
          <el-table-column label="SKU重量" prop="weight"></el-table-column>
          <el-table-column label="SKU图片">
            <template #default="{ row }">
              <img
                :src="row.skuDefaultImg"
                style="width: 100px; height: 100px"
              />
            </template>
          </el-table-column>
        </el-table>
      </el-dialog>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import type {
  SpuData,
  SkuResponseData,
  SkuData,
} from "@/api/product/spu/types.ts";
import { onBeforeUnmount, ref, watch } from "vue";
import useCategoryStore from "@/store/modules/category";
import { reqHasSpu, reqRemoveSpu, reqSkuInfo } from "@/api/product/spu";
import type { HasSpuResponseData, Records } from "@/api/product/spu/types.ts";
import SpuForm from "./components/SpuForm.vue";
import SkuForm from "./components/SkuForm.vue";
import { ElMessage } from "element-plus";
let categoryStore = useCategoryStore();
let scene = ref<number>(0);
let pageNo = ref<number>(1);
let pageSize = ref<number>(3);
let records = ref<Records>([]);
let total = ref<number>(0);
let SpuFormRef = ref<any>(null);
let SkuFormRef = ref<any>(null);
let skuArr = ref<SkuData[]>([]);
let show = ref<boolean>(false);

watch(
  () => categoryStore.c3Id,
  () => {
    if (!categoryStore.c3Id) return;
    getHasSpu();
  }
);
const getHasSpu = (page = 1) => {
  pageNo.value = page;
  reqHasSpu(pageNo.value, pageSize.value, categoryStore.c3Id).then(
    (res: HasSpuResponseData) => {
      if (res.code === 200) {
        records.value = res.data.records;
        total.value = res.data.total;
      }
    }
  );
};
const changeSize = () => {
  getHasSpu();
};
const addSpu = () => {
  scene.value = 1;
  SpuFormRef.value.initAddSpu(categoryStore.c3Id);
};
const updateSpu = (row: SpuData) => {
  scene.value = 1;
  SpuFormRef.value.initHasSpuData(row);
};
const changeScene = (obj: any) => {
  const { flag, params } = obj;
  scene.value = flag;
  params === "update" && getHasSpu(pageNo.value);
  params !== "update" && getHasSpu();
};
const addSku = (row: SpuData) => {
  scene.value = 2;
  SkuFormRef.value.initSkuData(categoryStore.c1Id, categoryStore.c2Id, row);
};
const findSku = async (row: SpuData) => {
  let res: SkuResponseData = await reqSkuInfo(row.id as number);
  if (res.code === 200) {
    skuArr.value = res.data;
    show.value = true;
  }
};
const deleteSpu = async (row: SpuData) => {
  let res: any = await reqRemoveSpu(row.id as number);
  if (res.code === 200) {
    ElMessage.success("删除成功");
    getHasSpu(records.value.length > 1 ? pageNo.value : pageNo.value - 1);
  } else {
    ElMessage.error("删除失败");
  }
};
onBeforeUnmount(() => {
  categoryStore.$reset();
});
</script>

<style scoped></style>
