import { notificationHistoryOperation } from '../notifications/history-repository';

/** Only short task labels are archived; prompts, responses and credentials are not copied into notifications. */
export async function publishAiNotification(id: string, provider: string, title: string, outcome: 'success' | 'error' | 'unknown' | 'skipped'): Promise<void> {
  const level = outcome === 'success' ? 'success' : outcome === 'error' ? 'error' : 'warning';
  await notificationHistoryOperation('append', {
    id, appType:'ai-workspace', appName:'AI 工作区',
    title:outcome === 'success' ? `${provider} 执行已完成` : outcome === 'error' ? `${provider} 执行失败` : outcome === 'skipped' ? `${provider} 定时任务已跳过` : `${provider} 执行结果未确认`,
    subtitle:title.slice(0,160), message:outcome === 'unknown' ? '请打开 AI 工作区核对，勿盲目重复执行。' : outcome === 'skipped' ? '错过计划时间超过 10 分钟，本次未执行。' : '',
    level, createdAt:Date.now(), read:false, target:{type:'module',moduleId:'multica'}
  });
}
